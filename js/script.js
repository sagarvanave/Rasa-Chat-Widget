$(function() {
  var INDEX = 0; 
  $("#chat-submit").click(function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val(); 
    if(msg.trim() == ''){
      return false;
    }
    generate_message(msg, 'self');
    
    setTimeout(function() {
      sayToBot(msg);      
    }, 500)
    
  })

  function sayToBot(message) {
    console.log("User Message:", message)
    $.ajax({
      url: 'http://localhost:5005/webhooks/rest/webhook',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "message": message,
        "sender": "Sagar"
      }),
      success: function (data, textStatus) {
        if(data != null){
            console.log("Success : "+data);
            generate_message(data,'user');
        }
      },
      error: function (errorMessage) {
        msg="Could not connect to server... :( Please try again.";
        generate_message(msg, "user");
        console.log('Error : ' + errorMessage);
  
      }
    });
  }
  
  function generate_message(val, type) {
    INDEX++;
    var str="";
    var msg="";
    if (val.length < 1){
      msg="Could not connect to server... :( Please try again.";
    }
    else if(type=="self")
    {
      msg=val;
    }
    else if(typeof(val)=="string" && type=="user")
    {
      msg=val;
    }
    else
    {
      for (i = 0; i < val.length; i++) {
				//check if there is text message
				if (val[i].hasOwnProperty("text")) {
					msg+=val[i].text+"<br>";
				}

				//check if there is image
				if (val[i].hasOwnProperty("image")) {
					msg+="<img src='"+val[i].image+"' class='chat_img'>";
				}
			}
    }
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img class='img_"+type+"'>";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    if(type == 'self'){
     $("#chat-input").val(''); 
    }    
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
  }  
  

  
  $(document).delegate(".chat-btn", "click", function() {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  })
  
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
})