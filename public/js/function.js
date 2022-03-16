var user_response; //the Text field from which we'll retrieve the user's query or response
var rec_btn; //btn which records what the user wants to say
var post_btn; //btn to send the user's response or query
var conversation; //the div in which the conversation btw the user and assistant will be displayed
var apiAI = "https://api.api.ai/v1/"; //we'll send users query to this location using AJAX
var accesskey = "TeresaHasStoppedOps"; //this is the unique key which helps identify which agent we're trying to connect
var msglistening = "Listening..."; //when user has clicked the record btn
var connErr = "Server Error!Please Try Again.";
var conversation;
$(document).ready(function() {
  //after document loads, we'll access the properties of the UI elements using JQuery
  user_response = $("#user_response");
  rec_btn = $("#rec_btn");
  post_btn = $("#post_btn");
  conversation = document.getElementById("conversation");
  //if the user types something and clicks the send button or presses enter, we'll call this function
  post_btn.click(eventOccur);
  user_response.keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      eventOccur;
    }
  });
});
function eventOccur() {
  if (user_response.val() != "") {
    userResponse(user_response.val());
  } else alert("Please speak or type something!");
}
function send() {
  //we'll store the response of the user in a var to make it easier to send it.
  var msg = user_response.val();
  $.ajax({
    //we'll specify arguments for ajax
    type: "POST",
    url: apiAI + "query",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: "Bearer " + accesskey
    },
    data: JSON.stringify({ query: msg, lang: "en", sessionId: "teresago" }),
    success: function(data) {
      prepareResponse(data);
    },
    error: function() {
      speakResponse(connErr);
    }
  });
  //lets clear the text field for the user to enter more questions:
  user_response.val("");
}
//this function extracts out the response of the agent from the JSON result
function prepareResponse(value) {
  var agent_response = value.result.speech; //get the response of the agent and store it in a var.
  speakResponse(agent_response); //send it to be spoken out loud.
}
//this function speaks out the result we get from API.ai
//this is done to make the assistant feel more natural.
function speakResponse(value) {
  //we don't want "Listening" to be spoken out aloud because it will be recorded with the voice of the user too
  if (value != msglistening) {
    //note we are using responsive voice JS an excellent TTS library
    try {
      responsiveVoice.speak(value, "US English Female"); //assign the data in the argument of this function to the text msg that has to be spoken
    } catch (e) {}
    displayResponse(value); //now that the message is spoken,we send it to be displayed.
  }
}
//this function creates a box and displays the user response in it.
function userResponse(value) {
  //The jquery method, append isn't working here, we don't know why, so this standard implementation.
  var lnbreak = document.createElement("br");
  conversation.insertBefore(lnbreak, conversation.childNodes[0]);
  var para = document.createElement("p");
  conversation.insertBefore(para, conversation.childNodes[0]);
  var user_response = document.createTextNode(value);
  para.appendChild(user_response);
  para.setAttribute("class", "user_response");

  //we'll also call the send function to send user_response to api.ai
  send();
}
//this function creates a box and displays the AI response in it
function displayResponse(value) {
  //The jquery method, append isn't working here, we don't know why, so this standard implementation.
  var lnbreak = document.createElement("br");
  conversation.insertBefore(lnbreak, conversation.childNodes[0]);
  var para = document.createElement("p");
  conversation.insertBefore(para, conversation.childNodes[0]);
  var ai_response = document.createTextNode(value);
  para.appendChild(ai_response);
  para.setAttribute("class", "ai_response");
}
