const dotenv=require('dotenv')
const express= require('express')
dotenv.config({path:'./.env'})
//Routes:
webhookRouter=require('./routes/webhook')
app=express()
const port=process.env.PORT
app.listen(port)
console.log(`Server is online at http://localhost:${port}`)
//Middlewares:
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use('/webhook',webhookRouter)
app.get('/',(req,res)=>{
    res.send('Hey there')
})
