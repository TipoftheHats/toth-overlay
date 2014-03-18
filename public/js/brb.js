$(document).ready(function (){
  $.getScript("js/jquery.transit.min.js", function () {
    console.log("jQuery.Transit loaded and executed.");
  });

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
    
    $('#upnext').html('Up next - ' + data.content);
    $('#upnext').removeClass('fadeOutDown');
    $('#upnext').addClass('animated fadeInUp');
    $('#upnext').on('webkitAnimationEnd', 
      function() {
        $('#upnext').removeClass('fadeInUp');
      });
  }

  function hideUpNext() {
    $('#upnext').addClass('animated fadeOutDown');
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
