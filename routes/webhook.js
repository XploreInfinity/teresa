const express= require('express')
const router= express.Router()

router.get('/',(req,res)=>{
    res.send('Ayo')
})
router.post('/',(req,res)=>{
    res.send('AMi')
})

module.exports= router