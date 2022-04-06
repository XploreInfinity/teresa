const express= require('express')
const router= express.Router()
const intents=['getWeather','websearch']
const weather = require('../webhooks/weather')
router.get('/',(req,res)=>{
    res.sendStatus(200)
})
router.post('/',async (req,res)=>{
    try {
        console.log('The body:',req.body)
        console.log('Where ami')
        const intent = req.body.queryResult.intent.displayName
        switch(intents.indexOf(intent)){
            case 0: await weather(req,res); break;
            default : return res.status(400).json({error:"Bad Request"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Server Error"})
    }
})

module.exports= router