const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config({path:'.env'})
const weather = async(req,res)=>{
    try {
        const city = req.body.queryResult.parameters.city
        const response = await axios.get(encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${process.env.WEATHER_KEY}`))
        const weatherData = response.data
        /*const templateData ={
            location : `${weatherData.name},${weatherData.sys.country}`,
            minTemp :weatherData.main.temp_min,
            maxTemp :weatherData.main.temp_max,
            feels_like :weatherData.main.feels_like,
            pressure :weatherData.main.pressure,
            humidity :weatherData.main.humidity,
            wind : {speed:weatherData.wind.speed}
            
        }*/
        const webhookResponse ={
            "fulfillmentMessages": [
            {
              "payload": {
                  // custom integration payload here
                data:weatherData
            }
            }
        ]}
        res.status(200).json(webhookResponse)
        
    } catch (error) {
        console.log(error)
        if(error.response){
            if(error.response.status==404){
              //SEND STANDARD PLAINTEXT RESPONSE(couldnt find city)
              const webhookResponse ={
                "fulfillmentMessages": [
                  {
                    "text": {
                    // custom integration payload here
                    text:["I'm sorry I couldn't find that city..."]
                    }
                  }
                ]}
            }//Didn't add a response if the weather api fails,because if it does, webhook request will automatically timeout and dialogflow will respond with a preset error message
            
      }
    }
}
module.exports = weather