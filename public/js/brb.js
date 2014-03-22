//execute after the DOM has loaded
$(document).ready(function (){
  var messages = [];
  var dashHostname = 'http://'+document.location.hostname+':1337';
  var dashSocket = io.connect(dashHostname);
  
  dashSocket.on('message', function (data) {
    switch(data.message) {
      case 'showupnext':
        showUpNext(data);
        break;
      case 'hideupnext':
        hideUpNext();
        break;
      case 'showcountdown':
        showCountdown(data);
        break;
      case 'hidecountdown':
        hideCountdown();
        break;
    }
   });

  //*----- BRB Screen -----*//

  function showUpNext(data) {
    if (!data.content) {
      return;
    }
    
    $('#countdown').transition({
      'top': '0px'
    }, 1000, 'ease-out');
    
    $('#upnext').html('Up next - ' + data.content);
    $('#upnext').removeClass('fadeOutUp');
    $('#upnext').addClass('animated fadeInDown');
    $('#upnext').on('webkitAnimationEnd', 
      function() {
        $('#upnext').removeClass('fadeInDown');
      });
  }

  function hideUpNext() {
    $('#countdown').transition({
      'top': '-36px'
    }, 1000, 'ease-out');
  
    $('#upnext').addClass('animated fadeOutUp');
  }	
  
  function showCountdown(data) {
    if (!data.content) {
      return;
    }
    
    $('#upnext').transition({
      'top': '0px'
    }, 1000, 'ease-out');
    
    var cd = new Date();
    $('#countdown').countdown(cd.toLocaleDateString() + ' ' + data.content, function(event) {
      $(this).html(event.strftime('%H:%M:%S'));
    });
    $('#countdown').removeClass('fadeOutDown');
    $('#countdown').addClass('animated fadeInUp');
    $('#countdown').on('webkitAnimationEnd', 
      function() {
        $('#countdown').removeClass('fadeInUp');
      });
  }

  function hideCountdown() {
    $('#upnext').transition({
      'top': '36px'
    }, 1000, 'ease-out');
  
    $('#countdown').addClass('animated fadeOutDown');
  }	
});

function sendMessage(socket, commandstring, meta) {
  socket.emit('send', {message: commandstring, content: meta });
}

// execute after all of the graphics have loaded
$(window).load(function() {  
  console.log("[BRB] Page Loaded");
  var url = $.url();
  if (url.param('raiseshutters') == 'true') {
    console.log("[BRB] RaiseShutters is set to 'true'. Sending 'raiseshutters' message.");
    var hostname = 'http://'+document.location.hostname+':1337';
    var socket = io.connect(hostname);
    var msg = {'anim':'', 'type': 'outLast', 'scene': ''};        
    sendMessage(socket, 'transition', JSON.stringify(msg)); 
  }
});