$('document').ready(async()=>{
  //Trigger the post_btn click event if user presses the enter key:
  $('#user_response').keypress((e)=>{
    if(e.keyCode==13)
      $('#post_btn').click()
  })
  $('#post_btn').on('click',async ()=>{
    const user_response = $('#user_response').val().trim()
    if(user_response){
      let userResponse = `<div class='user_response'>
        ${user_response}
      </div>`
      $('#conversation').append(userResponse)
      try{
        const response =await axios.post('https://teresa.glitch.me/dflowconnect',{query:user_response})
        $('#user_response').val('')
        let speak = ''
        if(response.data.data){
          $('#conversation').append($.parseHTML(response.data.data))
          responsiveVoice.speak(response.data.sayThis,"UK English Female")
        }
        else{ 
          let aiResponse=`<div class='ai_response'>
            ${response.data.text}
          </div>`
          //Append the message to the conversation div:
          $('#conversation').append(aiResponse)
          //And also speak the message:
          responsiveVoice.speak(response.data.text,"UK English Female")
        }
      }catch(error){}
    }else{
      //Since the user hasn't typed anything,shake the response_ui to indicate the empty text field
      $('.response_ui').addClass("shake_ui")
      setTimeout(()=>$('.response_ui').removeClass("shake_ui"),350)
    }
  })
})
