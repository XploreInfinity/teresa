"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const teresa = express();
var fullfilment="";
teresa.use(
  bodyParser.urlencoded({
    extended: true
  })
);

teresa.use(bodyParser.json());
teresa.get("/getWeather",function(req, res) {
    OpenWeather("New York",function (data){
     var weatherString="";
     console.log(data);
     console.log("This function just ran");
     
      if(data.cod==404) weatherString="Oops.I'm sorry,I can't find that city.";
      else{
        var loc=data.name+","+data.sys.country;
        var temp=""+(data.main.temp-273.15).toFixed(2)+"°C ("+(data.main.temp_min-273.15).toFixed(2)+" to "+(data.main.temp_max-273.15).toFixed(2)+")°C";
        var press=data.main.pressure+"hPa";
        var clouds=data.clouds.all+"%";
        var humidity=data.main.humidity+"%";
        var wind= Math.floor((data.wind.deg/45) + 0.5);
        var arr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        var windDr=arr[(wind %8)];
        var windSpeed= (1.609344*data.wind.speed).toFixed(2);
      weatherString="Weather for "+loc+":\nTemperature:"+temp+"\nHumidity:"+humidity+"\nWind:"+windDr+" "+windSpeed+"kph\nPressure:"+press+"\nCloudiness:"+clouds+"\nPowered by Openweathermap.org";
      }
      var speechResponse = {
          google: {
            expectUserResponse: true,
            richResponse: {
              items: [
                {
                  simpleResponse: {
                    textToSpeech: weatherString
                  }
                }
              ]
            }
          }
        };
  res.send({
      payload: speechResponse,
      fulfillmentText:weatherString,
      speech: "",
      displayText: "",
      source: "webhook-echo-sample"
    });
  });/*
 var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: ""
            }
          }
        ]
      }
    }
  };
console.log("OOOOOOhNOOOOO!!");
return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: fullfilment,
    speech: "",
    displayText: "",
    source: "webhook-echo-sample"
  });*/
});

function OpenWeather(city,_callback) {
var data; //This will store the page we're downloading.
  var urldata = {
    host: "api.openweathermap.org",
    path: encodeURI("/data/2.5/weather?q="+city+"&&appid=113ee8ea405d5a1f945b3ae1311f1f51"),
    method: "GET"
  };

  function OnResponse(response) {
    
    response.on("data", function(chunk) {
      //Executed whenever a chunk is received.
      data += chunk; //Append each chunk to the data variable.
console.log("BooyahBb");
    });

    response.on("end", function() {
    _callback(JSON.parse(data.replace("undefined","")));//remove the "undefined" at the beginning of the string and convert it to JSON.
    });
  }

  http.request(urldata, OnResponse).end();
}
teresa.listen(80);
