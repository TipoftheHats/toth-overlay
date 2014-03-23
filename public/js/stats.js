$(document).ready(function (){
    var messages = [];
    var dashHostname = 'http://'+document.location.hostname+':1337';
    var dashSocket = io.connect(dashHostname);
    
    dashSocket.on('message', function (data) {
        switch(data.message) {
			case 'showstats':
                showStats(data);
                break;
			case 'hidestats':
                hideStats();
                break;
        }
     });
	
	//*----- STATS -----*//
	
    function showStats(data) {
        if(data.content) {
			var link = "http://toth.sizzlingstats.com/stats/" + data.content;	
			document.getElementById('ss_frame').src = link;
        }        
    }
	
	function hideStats() {
		document.getElementById('ss_frame').src = "";	
    }	
});

function sendMessage(socket, commandstring, meta) {
  socket.emit('send', {message: commandstring, content: meta });
}

// execute after all of the graphics have loaded
$(window).load(function() {  
  console.log("[STATS] Page Loaded");
  var url = $.url();
  if (url.param('changebg') == 'true') {
    console.log("[STATS] ChangeBG is set to 'true'. Sending 'changebg' message.");
    var hostname = 'http://'+document.location.hostname+':1337';
    var socket = io.connect(hostname);       
    sendMessage(socket, 'changebg', 'toth_stats.webm');
  }
});