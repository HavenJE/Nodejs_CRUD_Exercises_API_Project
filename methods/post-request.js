// Here, we are making a POST request to create an exercise - endpoint is api/movies 


// The crypto module provides a way of handling encrypted data - we use it in order to generate the UUID 
const crypto = require("crypto");

// To import the body parser from body-parser.js file 
const requestBodyParser = require("../utilities/body-parser"); 
const writeToFile = require("../utilities/write-to-file"); 

module.exports = async (req, res) => {
    if (req.url === "/api/exercises") {
        try {
            let body = await requestBodyParser(req)
            // We need to get the data the user is sending to the server
            console.log("Request Body: ", body)
            // After getting the body request, we need to add that to exercise JSON file, but before, we need to create an id for the new created exercise 
            body.id = crypto.randomUUID(); // This will create a new uuid 
            req.exercises.push(body); 
            writeToFile(req.exercises); // this contains the complete exercises set 
            res.writeHead(201, { "Content-type": "application/json" });
            res.end(); 
        } catch(err) {
            console.log(err);
            res.writeHead(400, { "Content-type": "application/json"});
            res.end( JSON.stringify({ 
            title: "Failed Validation!", 
            message: "Request body is not valid!" 
            })
            )
        }
    }  else {
        res.writeHead(404, { "Content-type": "application/json"});
        res.end(JSON.stringify({ 
            title: "Not Found!", 
            message: "Route not found!" 
        }))
    }
};