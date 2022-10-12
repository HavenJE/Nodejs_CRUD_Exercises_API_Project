
//
const writeToFile = require("../utilities/write-to-file"); 

module.exports = (req, res) => {
    // Similar to GET & POST requests, we need to set an id 
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1); 

    // id = api/exercises + uuid - The entire url starting from after the / which is api/exercises/1  
    let id = req.url.split("/")[3];
    console.log(id);

    // Here we need to check the uuid passed by the user is a valid uuid by creating regex = regular expression for uuid4 
    // We place a regular expression which will check for the uuid - you can find it in the internet 
    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    ); 

    if (!regexV4.test(id)) { // check of the uuid passed is valid - if return is false, then return the following: 
        res.writeHead(400, { "Content-type": "application/json"});
        res.end(
            JSON.stringify({ 
            title: "Failed Validation!", 
            message: "Your UUID is not valid!" 
            })
        ); 
        } else if (baseUrl === "/api/exercises/" && regexV4.test(id)) { // if this the url && it has a valid uuid, then you can delete the exercise from exercises.json 
            // first, we need to have the index of the exercise I want to delete 
            const index = req.exercises.findIndex((exercise) => {
                // return if the exercise id is a match 
                return exercise.id === id; // now we have the index of the exercise 
            })
            if (index === -1) {
                res.statusCode = 404;
                res.write(JSON.stringify({ 
                    title: "Not Found!", 
                    message: "The Exercise you looking for is not found!" 
                })
                ); 
            res.end(); 
            } else { // If the exercise is found,
                //  then delete the exercise from exercises.json 
                req.exercises.splice(index, 1); 
                writeToFile(req.exercises); // writing it to the file 
                res.writeHead(204, {"Content-Type": "application/json"});
                res.end(JSON.stringify(req.exercises)); // passing the remaining exercises we have after deleting that exercise 
            }
        }
};