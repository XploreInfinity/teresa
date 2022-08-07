const dotenv=require('dotenv')
const express= require('express')
dotenv.config({path:'./.env'})
const sessionManager = require('./middlewares/sessionManager')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const helmet = require('helmet')

const webhookRouter=require('./routes/webhook')
const dflowRouter=require('./routes/dflowconnect')
const app=express()
const port=process.env.PORT


//Middlewares:
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({limit:'1mb',extended:true}))
app.use(helmet({
    contentSecurityPolicy: false,
  }))
app.use(morgan('common'))
app.use(sessionManager)
app.use(express.static('public'))

//Routes:
app.use('/dflowconnect',dflowRouter)
app.use('/webhook',webhookRouter)

app.listen(port,()=>{
console.log(`Server is online at http://localhost:${port}`)
})