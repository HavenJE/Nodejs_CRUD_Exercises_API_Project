

// we are importing a file system fs - its a Node.js file system module allows you to work with the file system on your computer using the path method with it hence we 
// need to import both of them below 
// The aim of using fs file system is to be able to us the fs.writeFile() method which replaces the specified file and content if it exists
const fs = require("fs"); 
const path = require("path"); 

module.exports = (data) => {
    console.log("The data we are adding to the file is :", data)
    try {
        fs.writeFileSync(
            path.join(
                __dirname, // this is the path of the file 
                "..", // go two levels up to the data folder 
                "data", 
                "exercises.json"),
                JSON.stringify(data),
                "utf-8"
            );
    } catch(err) {
        console.log("We have an error:", err)
    }
}