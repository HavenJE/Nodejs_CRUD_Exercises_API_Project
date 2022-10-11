// To create an HTTP server 
const http = require('http'); 

// const url = require('url'); 

// Exporting req's from the methods files 
const getReq = require('./methods/get-request');
const postReq = require('./methods/post-request');
const putReq = require('./methods/put-request');
const deleteReq = require('./methods/delete-request');

// To import the data 
let exercises = require('./data/exercises.json'); 



// To use the .env port - this should show the sever starting at whatever the .env PORT= equals to e.g. 5000 
// require("dotenv").config(); 

// create a port for the server to listen - if you the port is not process.env.PORT, then listen to localport 5001
const PORT = process.env.PORT || 5001; 

// To create an http server 
const server = http.createServer((req, res) => {
    req.exercises = exercises; // this is the data that we have 

    switch(req.method) {
        case "GET":
        getReq(req, res); 
        break; 
        case "POST":
        postReq(req, res); 
        break; 
        case "PUT":
        putReq(req, res); 
        break; 
        case "DELETE":
        deleteReq(req, res); 
        break; 
        default:
        res.statusCode = 404;
        res.setHeader("Content-type", "application/json");
        res.write(
            JSON.stringify({title: "Not Found!", message: "Route not found!"})
        );
        res.end(); 
    }
})

// To listen to the server - in case we use the PORT 5001 
server.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`); 
})