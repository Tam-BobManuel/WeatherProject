const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
   
})

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apikey = "23fbb8ff2936e31194fdd173f4bb43e7"
    const units = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=`+ query +`&appid=`+ apikey +`&units=`+ units;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>"+"The temperature in "+ query +" is " + temp + " degrees Celcius"+"</h1>");
        res.write("<p>" +"The weather is curently "+weatherDescription+ "</p>")
        res.write("<img src="+imageURL+">");

        res.send();
        })
    });
})





app.listen(3000, function(){
    console.log("Server running on port 3000...")
})
