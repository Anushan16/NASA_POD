require('dotenv').config()
const express = require('express');
const {
    get
} = require('http');
const app = express();

// Using native HTTPS Module to handle GET Request
const https = require('https')
const request = require('request')

const bodyParser = require('body-parser');
const {
    response
} = require('express');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));



app.set('view engine', 'ejs')

app.get("/", function (req, res) {

    res.render("home",{titleName: "NASA's Picture of The Day"})


});



app.post('/', function (req, res) {

    const apiKey = process.env.API_KEY



    const url = 'https://api.nasa.gov/planetary/apod?api_key=' + apiKey + '&date=' + req.body.dateChosen + '&thumbs=True'
    console.log(url)
    const stsCode = response.statusCode



    https.get(url, function (response) {

        // errorHandling to route to appropriate response

        if (response.statusCode === 200) {
            console.log("Status " + stsCode + " = No Errors")

            response.on('data', function (data) {



                //parsing returned data into JSON 
                const podData = JSON.parse(data)

                if (podData.media_type === "image") {

                    var url = podData.url

                } else {

                    var url = podData.thumbnail_url

                }











                // console.log("\""+url+"\"")

                const options = {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
                const dateO = new Date(podData.date + "T00:00-0800")


                const date = dateO.toLocaleDateString("en-US", options)



                const title = podData.title

                const desc = podData.explanation


                res.render("pod", {
                    data: {
                        theDate: date,
                        theTitle: title,
                        theDesc: desc,
                        theURL: url
                    }, titleName : "POD for " + date
                })



                // console.log(url)
                // res.write("<h1>NASA's Pic of the Day: " + title+"</h1>")
                // res.write("<img src="+url+">")
                // res.write("<p>"+desc+"</p>")
                // res.write("<h2>This is the NASA pic of the day for " + date +"</h2>")
                // res.end();
            })

        } else {
            console.log("Status " + stsCode + " = Sorry, there seems to be a problenm... please try again later")
            res.render("failure",  {titleName: "Houston... we have a problem"})


        }





    })


})

// post Request for failure route
app.post("/failure", function (req, res) {
    res.redirect("/")
})

app.post("/pod", function (req, res) {
    res.redirect("/")
})





app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running ...")
})