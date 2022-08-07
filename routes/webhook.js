const express= require('express')
const router= express.Router()
const intents=['getWeather','DDGSearch']
const weather = require('../webhooks/weather')
const ddgsearch = require('../webhooks/ddgsearch')
router.get('/',(req,res)=>{
    res.sendStatus(200)
})
router.post('/',async (req,res)=>{
    try {
        
        const intent = req.body.queryResult.intent.displayName
        switch(intents.indexOf(intent)){
          case 0: await weather(req,res); break;
          case 1: await ddgsearch(req,res);break;
          default : return res.status(400).json({error:"Bad Request"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Server Error"})
    }
})

module.exports= router