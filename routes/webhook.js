const express= require('express')
const router= express.Router()
const intents=['weather','websearch']
const weather = require('./weather')
router.get('/',(req,res)=>{
    res.send('Ayo')
})
router.post('/',async (req,res)=>{
    try {
        const intent = req.body.intent.displayName
        switch(intents.indexOf(intent)){
            case 0: await weather(req,res); break;
            default : return res.status(400).json({error:"Bad Request"})
        }
    } catch (error) {
        return res.status(500).json({error:"Server Error"})
    }
})

module.exports= router