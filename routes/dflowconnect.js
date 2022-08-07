const express = require("express");
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config({path:'.env'})
router.post("/",(req,res)=>{
  const projectId = process.env.PROJECT_ID;
  // sessionId: String representing a random number or hashed user identifier
  const sessionId = req.sessionId
  // queries: A set of sequential queries to be send to Dialogflow agent for Intent Detection
  const query = [req.body.query]
  // languageCode: Indicates the language Dialogflow agent should use to detect intents
  const languageCode = 'en';

  // Imports the Dialogflow library
  const dialogflow = require("@google-cloud/dialogflow");

  // Instantiates a session client
  const sessionClient = new dialogflow.SessionsClient();

  async function detectIntent(
    projectId,
    sessionId,
    query,
    contexts,
    languageCode
  ) {
    // The path to identify the agent that owns the created intent.
   const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };

    if (contexts && contexts.length > 0) {
      request.queryParams = {
        contexts: contexts,
      };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
  }

  async function executeQueries(projectId, sessionId, queries, languageCode) {
    // Keeping the context across queries let's us simulate an ongoing conversation with the bot
    let context;
    let intentResponse;
    for (const query of queries) {
      try {
        console.log(`Sending Query: ${query}`);
        intentResponse = await detectIntent(
          projectId,
          sessionId,
          query,
          context,
          languageCode
        );
        console.log("Detected intent");
        console.log(
          `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
        );
        console.log(intentResponse.queryResult.fulfillmentMessages)
        // Use the context from this response for next queries
        context = intentResponse.queryResult.outputContexts;
        if(intentResponse.queryResult.fulfillmentMessages[0].payload)
          return res.status(200).json({data:intentResponse.queryResult.fulfillmentMessages[0].payload.fields.data.stringValue,sayThis:intentResponse.queryResult.fulfillmentMessages[0].payload.fields.sayThis.stringValue})
        else
          return res.status(200).json({text:intentResponse.queryResult.fulfillmentMessages[0].text.text[0]})
      } catch (error) {
        console.log(error);
      }
    }
  }
  executeQueries(projectId, sessionId, query, languageCode);
});
module.exports = router;
