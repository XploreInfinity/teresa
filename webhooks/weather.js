//Webhook handler for Weather:
const dotenv = require('dotenv')
const axios = require('axios')
const ejs = require('ejs')
dotenv.config({path:'.env'})
const weather = async(req,res)=>{
    try {
        const city = req.body.queryResult.parameters.city
        const response = await axios.get(encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&&appid=${process.env.WEATHER_KEY}`))        
        const weatherData = response.data
        /*const templateData ={
            location : `${weatherData.name},${weatherData.sys.country}`,
            minTemp :weatherData.main.temp_min,
            maxTemp :weatherData.main.temp_max,
            feels_like :weatherData.main.feels_like,
            pressure :weatherData.main.pressure,
            humidity :weatherData.main.humidity,
            wind_speed : weatherData.wind.speed,
            
        }*/
        const sayThis =`It is ${weatherData.weather[0].description} in ${weatherData.name} with an average temperature of ${weatherData.main.temp} degrees celsius`
        const webhookResponse ={
            "fulfillmentMessages": [
            {
              "payload":{ 
                data: await ejs.renderFile('./templates/weather.ejs',{weatherData:weatherData}), //send a pre-rendered html weather widget containing the weather info
                sayThis: sayThis //a short description of the weather for the speech response
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
          return res.status(200).json(webhookResponse)
            
            }}
        //Didn't add a response if the weather api fails,because if it does, webhook request will automatically timeout and dialogflow will respond with a preset error message
        else return res.sendStatus(500)
    }
}
module.exports = weather