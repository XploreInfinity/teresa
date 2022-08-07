//Webhook handler for DDG search results
const axios = require('axios')
const ejs = require('ejs')
const he = require('he')
const DDG = require('duck-duck-scrape')
const ddgsearch = async (req,res)=>{
  try{
    const query = req.body.queryResult.queryText
    const response = await DDG.search(query)
    if(!response.noResults){
      //only return the top 5 results
      const searchData= response.results.slice(0,6)
      const sayThis = ["Here's what I found...",
                       "Search results, fresh from duckduckgo",
                       "I hope this helps...",
                       "The more you know...",
                       "Here are some search results, hot off the internet...",
                       "I got these from duckduckgo"
        
      ]
      const webhookResponse ={
              "fulfillmentMessages": [
              {
                "payload":{ 
                  data: await ejs.renderFile('./templates/DDGSearch.ejs',{searchData:searchData,he:he}), //send a pre-rendered html card containing search results
                  sayThis: sayThis[Math.floor(Math.random()*(6-0)+0)] //send one of the witty remarks to be spoken out loud
                }
              }
          ]}
      return res.status(200).json(webhookResponse)
    }else{
      const wittyResponse = ["Hmmm.. I couldn't find any search results for that... ",
                             "I'm sorry... but what you said doesn't make much sense...",
                             "Pardon? I'm confused... and so is my search engine",
                             "My search engine couldn't find much regarding that, I'm sorry...",]
      const webhookResponse ={
              "fulfillmentMessages": [
              {
                text: {
                  text: [
                    wittyResponse[Math.floor(Math.random()*(4-0)+0)] //generate a random number between 0-3, to randomly select one of the witty responses...
                  ]
                }
              }
          ]}
      return res.status(200).json(webhookResponse)
    }
  }catch(error){
    console.log(error)
    res.sendStatus(500)
  }
}
module.exports = ddgsearch