module.exports = (req, res) => {
    // Let's make a base url which is api/exercises 
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

    // To fetch all the exercises 
    if (req.url === "/api/exercises") {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.write(JSON.stringify(req.exercises)); // this to send the data 
        res.end(); 
    } else if (!regexV4.test(id)) { // check of the uuid passed is valid - if return is false, then return the following: 
        res.writeHead(400, { "Content-type": "application/json"});
        res.end(JSON.stringify({ 
            title: "Failed Validation!", 
            message: "Your UUID is not valid!" 
        })
        )
    } else if (baseUrl === "/api/exercises/" && regexV4.test(id)) { // if UUID valid is true, then return the individual exercise  
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        let filterExercise = req.exercises.filter((exercise => {
            return exercise.id === id; 
        }))
        // in case we want to retrieve an exercise that is not in our data 
        // if we have the exercise: 
        if (filterExercise.length > 0) { 
            res.statusCode = 200;
            res.write(JSON.stringify(filterExercise)); 
        res.end(); 
        } else {
            res.statusCode = 404;
            res.write(JSON.stringify({ 
                title: "Not Found!", 
                message: "The Exercise you looking for is not found!" 
            })
            ); 
        res.end(); 
        }
    }
    else {
        res.writeHead(404, { "Content-type": "application/json"});
        res.end(JSON.stringify({ 
            title: "Not Found!", 
            message: "Route not found!" 
        }))
    }
};