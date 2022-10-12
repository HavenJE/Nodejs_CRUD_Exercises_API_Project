// Here, we are using the PUT request, meaning, we are going to receive the data stream from the client to the server => we need the request body parser 
const requestBodyParser = require("../utilities/body-parser"); 
const writeToFile = require("../utilities/write-to-file"); 

module.exports = async (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1); 
    console.log(baseUrl);

    // id = api/exercises + uuid - The entire url starting from after the / which is api/exercises/1  
    let id = req.url.split("/")[3];
    console.log(id);

    // Here we need to check the uuid passed by the user is a valid uuid by creating regex = regular expression for uuid4 
    // We place a regular expression which will check for the uuid - you can find it in the internet 
    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    ); 
    // we need to check the uuid which we have received 
    if (!regexV4.test(id)) { // check of the uuid passed is valid - if return is false, then return the following: 
        res.writeHead(400, { "Content-type": "application/json"});
        res.end(
            JSON.stringify({ 
            title: "Failed Validation!", 
            message: "Your UUID is not valid!" 
            })
        ); 
    } else if (baseUrl === "/api/exercises/" && regexV4.test(id)) {
        try {
            let body = await requestBodyParser(req); 
            // we need to get the index of the exercise that you want to update 
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
            } else {
                req.exercises[index] = {id,...body}; 
                writeToFile(req.exercises);
                res.writeHead(200, { "Content-type": "application/json"})
                res.end(JSON.stringify(req.exercises[index]))
            } 
        } catch (err) {
            console.log(err);
            res.writeHead(400, { "Content-type": "application/json"});
            res.end( JSON.stringify({ 
            title: "Failed Validation!", 
            message: "Request body is not valid!" 
            })
            )
        }
    } else {
        res.writeHead(404, { "Content-type": "application/json"});
        res.end(JSON.stringify({ 
            title: "Not Found!", 
            message: "Route not found!" 
        }))
    }
};