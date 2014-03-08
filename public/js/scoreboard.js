$(document).ready(function (){
    var messages = [];
    var dashHostname = 'http://'+document.location.hostname+':1337';
    var dashSocket = io.connect(dashHostname);
    
    dashSocket.on('message', function (data) {
        switch(data.message) {
			case 'updatescore':
				updateScore(data);
				break;
            case 'swapteamcolors':
                swapTeamColors();
                break;
        }
     });
	
	//*----- SCOREBOARD -----*//
    
	function updateScore(data) {
        var msgParsed = JSON.parse(data.content);
        var mapNum = msgParsed.mapNum;
        var mapNames = msgParsed.mapNames;
        var mapScores = msgParsed.mapScores;
        var teamNames = msgParsed.teamNames;
        
        /* ACTIVE MAP */
        //darken everything
        $('#sb-table > tbody > tr > th').addClass('darken');
        $('#sb-table > tbody > tr > td').children().addClass('darken');
        
        //lighten map name
        $('#sb-table > tbody > tr:nth-child(1) > th:nth-child('+mapNum+')').removeClass('darken');
        //lighten team names and scores
        $('#sb-table > tbody > tr:nth-child(2) > td:nth-child('+mapNum+')').children().removeClass('darken');
        
        /* MAP NAMES */
        if(mapNames.map1) { $('#sb-map1').html(mapNames.map1); }
        if(mapNames.map2) { $('#sb-map2').html(mapNames.map2); }
        if(mapNames.map3) { $('#sb-map3').html(mapNames.map3); }
        
        /* TEAM NAMES */
        //updates team names for all maps with just 2 lines of code, yay jQuery selectors!
        if(teamNames.team1) { $('#sb-table > tbody > tr:nth-child(2) > td > div:nth-child(1)').html(teamNames.team1); }
        if(teamNames.team2) { $('#sb-table > tbody > tr:nth-child(2) > td > div:nth-child(5)').html(teamNames.team2); }
        
        /* SCORES */
        if(mapScores.map1.team1) { $('#map1-team1-score').html(mapScores.map1.team1); }
        if(mapScores.map2.team1) { $('#map2-team1-score').html(mapScores.map2.team1); }
        if(mapScores.map2.team1) { $('#map3-team1-score').html(mapScores.map3.team1); }
        if(mapScores.map1.team1) { $('#map1-team2-score').html(mapScores.map1.team2); }
        if(mapScores.map2.team1) { $('#map2-team2-score').html(mapScores.map2.team2); }
        if(mapScores.map2.team1) { $('#map3-team2-score').html(mapScores.map3.team2); }      
    }
    
    function swapTeamColors() {
        $(".red").addClass("temp")
                 .removeClass("red");
        
        $(".blu").addClass("red")
                 .removeClass("blu");
        
        $(".temp").addClass("blu")
                  .removeClass("temp");
    }
});
