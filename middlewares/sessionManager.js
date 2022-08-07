const crypto = require('crypto')
//Sessions are used by dialogflow to differentiate between multiple user requests.
const sessionManager =(req,res,next)=>{
  let sessionId = ''
  //check whether the user already has a session ID:
  let sessionCookie = req.cookies['sessionCookie']
  if(!sessionCookie){
    sessionId = crypto.randomUUID()
    //create a new session-cookie:
    res.cookie('sessionCookie',sessionId)
  }else
    sessionId = sessionCookie
  //To save subsequent middlewares/router function the trouble of determining whether the cookie
  //was already set or was set during this request, simply pass the UUID inside the cookie via a sessionId key inside the req object:
  req.sessionId = sessionId
  next()
}
module.exports = sessionManager