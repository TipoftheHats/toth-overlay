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
        }        
    }
});
