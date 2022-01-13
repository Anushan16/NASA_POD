const express = require('express');
const { get } = require('http');
const app = express();
// Using native HTTPS Module to handle GET Request
const https = require('https')
const request = require('request')

const bodyParser = require('body-parser');
const { response } = require('express');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {

    res.sendFile(__dirname+ '/index.html');
    
    
});



app.post('/', function(req,res) {

    const apiKey = "1gY8x93RZ3i7tl4vJFLO0IeQqaEfdOXGXqhAFWKm"

    const url = 'https://api.nasa.gov/planetary/apod?api_key='+apiKey+'&date='+req.body.dateChosen+'&thumbs=True'
    console.log(url)
    const stsCode = response.statusCode

    

    https.get(url, function(response) {

    // errorHandling to route to appropriate response

        if (response.statusCode === 200){
            console.log("Status " +stsCode+" = No Errors")
            
            response.on('data', function(data){

         
            
                //parsing returned data into JSON 
                const podData = JSON.parse(data)
                
                if (podData.media_type === "image"){
                    
                    var url = podData.hdurl
                   
                } else {
                    
                    var url = podData.thumbnail_url
                    
                }

         

                 


                
                

               

                   
                const date = podData.date
                const title = podData.title
        
                const desc = podData.explanation

               

             

    
         
             
               
                console.log(url)
                res.write("<h1>NASA's Pic of the Day: " + title+"</h1>")
                res.write("<img src="+url+">")
                res.write("<p>"+desc+"</p>")
                res.write("<h2>This is the NASA pic of the day for " + date +"</h2>")
                res.end();
            })

        }else {
            console.log("Status " +stsCode+" = Sorry, there seems to be a problenm... please try again later")
            res.sendFile(__dirname+"/failure.html")
            
            
        }
    

       

        
    })
    
    
})

// post Request for failure route
app.post("/failure", function (req, res) {
    res.redirect("/")
})






app.listen(3000, function(){
    console.log("Server is running on port 3000...")
})



