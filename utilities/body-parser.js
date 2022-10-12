// The (request) is the one we are going to get from the client 

module.exports = async (request) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            // here, we creating an event to get the stream of data - when we get the callback, we get the rest (chunk) of the data and append that to the body 
            request.on("data", (chunk) => {
                body += chunk;
            })
            request.on("end", () => {
                // converting JSON data in string form into Javascript objects by JSON.parse(body)
                resolve(JSON.parse(body)); 
            })

        } catch (err) {
            console.log("We have errors", err)
            reject(err) // we rejecting the promise 
        }
    })
}