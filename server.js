const dotenv=require('dotenv')
const express= require('express')
dotenv.config({path:'./.env'})
const webhookRouter=require('./routes/webhook')
const dflowRouter=require('./routes/dflowconnect')
const app=express()
const port=process.env.PORT


//Middlewares:
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//Routes:
app.get('/',(req,res)=>{
    res.send('Hey there')
})
app.use('/dflowconnect',dflowRouter)
app.use('/webhook',webhookRouter)

app.listen(port,()=>{
console.log(`Server is online at http://localhost:${port}`)
})