const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config({path:'.env'})
const templateResponse = require('../utils/templateResponse')
const weather = async(req,res)=>{
    try {
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${process.env.WEATHER_KEY}`)
        templateResponse.fulfillmentMessages.payload[data] = weatherData
        res.status(200).json(templateResponse)
        /*const templateData ={
            location : `${weatherData.name},${weatherData.sys.country}`,
            minTemp :weatherData.main.temp_min,
            maxTemp :weatherData.main.temp_max,
            feels_like :weatherData.main.feels_like,
            pressure :weatherData.main.pressure,
            humidity :weatherData.main.humidity,
            wind : {speed:weatherData.wind.speed}
            
        }*/
        
    } catch (error) {
        if(error.response.status==404){
            //SEND STANDARD PLAINTEXT RESPONSE(couldnt find city)
            templateResponse.fulfillmentMessages.text[text] =["I'm sorry I couldn't find that city..."]
        }
    }
}
module.exports = weather