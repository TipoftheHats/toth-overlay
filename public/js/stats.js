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
