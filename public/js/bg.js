//execute after the DOM has loaded
$(document).ready(function (){
  var messages = [];
  var dashHostname = 'http://'+document.location.hostname+':1337';
  var dashSocket = io.connect(dashHostname);
  
  dashSocket.on('message', function (data) {
    switch(data.message) {
      case 'changebg':
        changeBG(data);
        break;
    }
   });

  //*----- Video BGs -----*//
  
  function changeBG(data) {
    if(!data.content) {
      return;
    }
    
    var vid = '<video id="bg" width="1280" height="720" autoplay="" loop="" style="display: block;">'
      + '<source src="img/bg/' + data.content + '" type="video/webm"></video>';
      
    console.log($('.main').html());
    console.log(vid);
    if ($('.main').html() == vid) {
      //same vid
      return;
    }

    $('.staging').html(vid);
    $('.staging #bg').get(0).volume = 0.25;
    $('.staging #bg').on('loadeddata', doWork); 
    
    function doWork() {
      $('.staging').transition({
        'left': '0%'
      }, 500, 'ease-out');      
      $('.main').transition({
        'left': '-100%'
      }, 500, 'ease-out') 
      .queue(function( nxt ) {
        $(this).css('left', '100%');
        swapVideoPlayers();
        nxt(); // continue the queue
      }); 
    }      
      
    function swapVideoPlayers() {
      $(".staging").addClass("temp")
               .removeClass("staging");
      
      $(".main").addClass("staging")
               .removeClass("main");
      
      $(".temp").addClass("main")
                .removeClass("temp");
      
      $('.staging #bg').off('loadeddata', doWork);
      $(".staging").html('');
    }
  }  
});