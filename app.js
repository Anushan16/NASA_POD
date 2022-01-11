const express = require('express');
const { get } = require('http');
const app = express();
const https = require('https')
// Using native HTTPS Module to handle GET Request
app.get("/", function(req,res) {

    const apiKey = "1gY8x93RZ3i7tl4vJFLO0IeQqaEfdOXGXqhAFWKm"

    const url = 'https://api.nasa.gov/planetary/apod?api_key='+apiKey+'&thumbs=True'

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data){
            //parsing returned data into JSON 
            const podData = JSON.parse(data)
            const date = podData.date
            const title = podData.title
            const url = podData.thumbnail_url
            const desc = podData.explanation
            console.log(podData)
            console.log(date)
            console.log(url)
            res.write("<h1>NASA's Pic of the Day: " + title+"</h2>")
            res.write("<img src="+url+">")
            res.write("<p>"+desc+"</p>")
            res.write("<h2>This is the NASA pic of the day for " + date +"</h2>")
            res.end();
        })
    })
    
})



app.listen(3000, function(){
    console.log("Server is running on port 3000...")
})