$(document).ready(function (){
  var messages = [];
  var dashHostname = 'http://'+document.location.hostname+':1337';
  var dashSocket = io.connect(dashHostname);
  
  dashSocket.on('message', function (data) {
    switch(data.message) {
    case 'showbracket':
      showBracket(data);
      break;
      }
   });

//*----- STATS -----*//

  function showBracket(data) {
    console.log('showbracket');
    if(data.content) {
      var link = "http://vps.alexvancamp.com:1337/getbracket?id=" + data.content;	
      document.getElementById('bracket_frame').src = link;
      console.log(link);
    }        
  }
});

function sendMessage(socket, commandstring, meta) {
  socket.emit('send', {message: commandstring, content: meta });
}

// execute after all of the graphics have loaded
$(window).load(function() {  
  console.log("[BRACKET] Page Loaded");
  var url = $.url();
  if (url.param('changebg') == 'true') {
    console.log("[BRB] ChangeBG is set to 'true'. Sending 'changebg' message.");
    var hostname = 'http://'+document.location.hostname+':1337';
    var socket = io.connect(hostname);       
    sendMessage(socket, 'changebg', 'toth_stats.webm');
  }
});