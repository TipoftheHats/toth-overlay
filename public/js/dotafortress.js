function sendMessage(socket, commandstring, meta) {
  socket.emit('send', {message: commandstring, content: meta });
}

//execute after the DOM has loaded
$(document).ready(function (){
	//load pURL plugin
	$.getScript("js/purl.js", function() {
		console.log("pURL loaded and executed.");
  });
  
  //load Ion.Sound plugin
	$.getScript("js/ion.sound.min.js", function() {

		console.log("Ion.Sound loaded and executed.");
		
		$.ionSound({
			sounds: [                       // set needed sounds names
				"demoman_cheers01",
				"demoman_cheers02",
				"demoman_cheers03",
				"demoman_cheers04",
				"demoman_cheers05",
				"demoman_cheers06",
				"demoman_cheers07",
				"demoman_cheers08",
				"engineer_cheers01",
				"engineer_cheers02",
				"engineer_cheers03",
				"engineer_cheers04",
				"engineer_cheers05",
				"engineer_cheers06",
				"engineer_cheers07",
				"heavy_cheers01",
				"heavy_cheers02",
				"heavy_cheers03",
				"heavy_cheers04",
				"heavy_cheers05",
				"heavy_cheers06",
				"heavy_cheers07",
				"heavy_cheers08",
				"medic_cheers01",
				"medic_cheers02",
				"medic_cheers03",
				"medic_cheers04",
				"medic_cheers05",
				"medic_cheers06",
				"pyro_cheers01",
				"pyro_cheers02",
				"pyro_cheers03",
				"scout_cheers01",
				"scout_cheers02",
				"scout_cheers03",
				"scout_cheers04",
				"scout_cheers05",
				"scout_cheers06",
				"sniper_cheers01",
				"sniper_cheers02",
				"sniper_cheers03",
				"sniper_cheers04",
				"sniper_cheers05",
				"sniper_cheers06",
				"sniper_cheers07",
				"sniper_cheers08",
				"soldier_cheers01",
				"soldier_cheers02",
				"soldier_cheers03",
				"soldier_cheers04",
				"soldier_cheers05",
				"soldier_cheers06",
				"spy_cheers01",
				"spy_cheers02",
				"spy_cheers03",
				"spy_cheers04",
				"spy_cheers05",
				"spy_cheers06",
				"spy_cheers07",
				"spy_cheers08",
				"demoman_jeers01",
				"demoman_jeers02",
				"demoman_jeers03",
				"demoman_jeers04",
				"demoman_jeers05",
				"demoman_jeers06",
				"demoman_jeers07",
				"demoman_jeers08",
				"demoman_jeers09",
				"demoman_jeers10",
				"demoman_jeers11",
				"engineer_jeers01",
				"engineer_jeers02",
				"engineer_jeers03",
				"engineer_jeers04",
				"heavy_jeers01",
				"heavy_jeers02",
				"heavy_jeers03",
				"heavy_jeers04",
				"heavy_jeers05",
				"heavy_jeers06",
				"heavy_jeers07",
				"heavy_jeers08",
				"heavy_jeers09",
				"medic_jeers01",
				"medic_jeers02",
				"medic_jeers03",
				"medic_jeers04",
				"medic_jeers05",
				"medic_jeers06",
				"medic_jeers07",
				"medic_jeers08",
				"medic_jeers09",
				"medic_jeers10",
				"medic_jeers11",
				"medic_jeers12",
				"pyro_jeers01",
				"pyro_jeers02",
				"pyro_jeers03",
				"scout_jeers02",
				"scout_jeers03",
				"scout_jeers04",
				"scout_jeers05",
				"scout_jeers06",
				"scout_jeers07",
				"scout_jeers08",
				"scout_jeers09",
				"scout_jeers10",
				"scout_jeers11",
				"scout_jeers12",
				"sniper_jeers01",
				"sniper_jeers02",
				"sniper_jeers03",
				"sniper_jeers04",
				"sniper_jeers05",
				"sniper_jeers06",
				"sniper_jeers07",
				"sniper_jeers08",
				"soldier_jeers01",
				"soldier_jeers02",
				"soldier_jeers03",
				"soldier_jeers04",
				"soldier_jeers05",
				"soldier_jeers06",
				"soldier_jeers07",
				"soldier_jeers08",
				"soldier_jeers09",
				"soldier_jeers10",
				"soldier_jeers11",
				"soldier_jeers12",
				"spy_jeers01",
				"spy_jeers02",
				"spy_jeers03",
				"spy_jeers04",
				"spy_jeers05",
				"spy_jeers06"
			],
			path: "snd/df/",  // set path to sounds
			multiPlay: true,  // can play multiple sounds at once
			volume: "0.15"    // not so loud please
		});
	});

  var messages = [];
  var dashHostname = 'http://'+document.location.hostname+':1337';
  var dashSocket = io.connect(dashHostname);
    
  dashSocket.on('message', function (data) {
    switch(data.message) {
      case 'df_ban':
        banCard(data);
        break;
      case 'df_unban':
        unbanCard(data);
        break;
      case 'df_pickplayer':
        pickPlayer(data);
        break;
      case 'df_unpick':
        unPick(data);
        break;
    }
  });
	
  //*----- Display Page Setup -----*//
  
  var classes = [ "scout", "soldier", "pyro", "demoman", "heavy", "engineer", "medic", "sniper", "spy" ];
  
  var players = {
		scout: [
			"clockwork",
			"ruwin",
			"squid",
			"cyzer",
			"decimate",
			"enigma",
			"shrugger",
			"youmustmike",
			"deadbolt",
      "br0nze"
		],
		soldier: [
			"blaze",
			"tlr",
			"seagull",
			"lansky",
			"grape",
			"tagg",
			"ma3la",
			"milo",
			"rr",
			"platinum"
		],
		pyro: [
			"cygnus",
			"hueylewis",
			"puddingcup"
		],
		demoman: [
			"bdonski",
			"xalox",
			"duwatna",
			"b4nny",
			"dummy"
		],
		heavy: [
			"snailboat",
			"arthur",
			"skyrolla"   
		],
		engineer: [
			"sigafoo",
			"spamfest",
			"vhalin"   
		],
		medic: [
			"smaka",
			"shade",
			"indust",
			"pyyyour",
			"harbleu"
		],
		sniper: [
			"bloodsire",
			"max",
			"paragon"
		],
		spy: [
			"stabby",
			"hei",
			"acooma"
		]   
	};
  
  /* programmatically generate each player's card, appending it to the
   * corresponding tf2class div in the html scaffolding in dotafortress.html */
  for (var i = 0; i < classes.length; i++) {
    var c = classes[i];
    $('#' + c).html('');
    for (var j = 0; j < players[c].length; j++) {
      var p = players[c][j];
      $('#' + c).append('<div id="' + p + '" class="playercard ' + c + 'card">' + 
                        '<p>' + p + '</p>' + 
                        '<video class="portrait" width="62" height="84" autoplay="" loop="" muted="muted" style="z-index: -1; display: block;" poster="/img/dotafortress/portrait/' + p + '_red.jpg">' +           
                        '<source id="webmsource" src="/img/dotafortress/portrait/' + p + '_red.webm" type="video/webm"></video></div>'
      );
    }
  }
  
  //*----- Util -----*//
  
	function getCheer(tf_class) {
		var numCheers = {demoman: 8, engineer: 7, heavy: 8, medic: 6, pyro: 3, scout: 6, sniper: 8, soldier: 6, spy: 8}
		
		//last bit of code here adds leading zero to single digit number and makes it a string, does nothing to double digit number
		return tf_class + "_cheers" + ("0" + getRandom(1, numCheers[tf_class])).slice(-2);
	}
	
	function getJeer(tf_class) {
		var numJeers = {demoman: 11, engineer: 4, heavy: 9, medic: 12, pyro: 3, scout: 12, sniper: 8, soldier: 12, spy: 6}
		
		//last bit of code here adds leading zero to single digit number and makes it a string, does nothing to double digit number
		return tf_class + "_jeers" + ("0" + getRandom(1, numJeers[tf_class])).slice(-2);
	}
	
	function getRandom(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}
	
	//*----- BANS -----*//
	
  function banCard(data) {
		if(data.content) {
			var msgParsed = JSON.parse(data.content);
			if(msgParsed.player && msgParsed.tf_class) {
				//play sound
				var jeer = getJeer(''+msgParsed.tf_class+'');
				console.log(jeer)
				$.ionSound.play(jeer);
			
				$(''+"#"+msgParsed.player+'').css('-webkit-filter','brightness(0.7)');
			}
    }
  }
	
	function unbanCard(data) {
    if(data.content) {
			var msgParsed = JSON.parse(data.content);
			if(msgParsed.player) {	
				$("#"+msgParsed.player).css('-webkit-filter','brightness(1.0)');
			}
    }        
  }
	
	function pickPlayer(data) {
		if(data.content) {
			var msgParsed = JSON.parse(data.content);
			if(msgParsed.player && msgParsed.slot) {
				//play sound
				var cheer = getCheer(msgParsed.tf_class);
				console.log(cheer)
				$.ionSound.play(cheer);
			
				$(msgParsed.slot).removeClass();
				$(msgParsed.slot).addClass('playercard');
				$(msgParsed.slot).addClass(msgParsed.tf_class+"card");
				$(msgParsed.slot).css('width', '81px');
				$(msgParsed.slot).css('height', '116px');
        
        //copy the html of the "source" playercard into the "picked" playercard       
        var content = $("#"+msgParsed.player).html();
        if (msgParsed.team == "blu") {
          //portraits are red by default, make it blu for blu team
          var content = content.replace( new RegExp("_red.", 'g'), "_blu.");
        }        
        $(msgParsed.slot).html(content);
        
				
				//dim the playercard since it can no longer be picked
				$(''+"#"+msgParsed.player+'').css('-webkit-filter','brightness(0.7)');
				
				if(msgParsed.team == "red") {
					//$(msgParsed.slot).css('-webkit-filter','drop-shadow(0px 0px 10px rgba(255,158,158,1.0))  brightness(1.3)');
					$(msgParsed.slot).addClass('redborder_big');
				} else {
					//$(msgParsed.slot).css('-webkit-filter','drop-shadow(0px 0px 10px rgba(158,202,255,1.0))  brightness(1.3)');
					$(msgParsed.slot).addClass('bluborder_big');
				}
			}
		}
	}
	
	function unPick(data) {
		if(data.content) {
			var msgParsed = JSON.parse(data.content);
			if(!msgParsed.slot || !msgParsed.player) {
        console.error("[unPick] Could not parse data!");
      }
      
      $(''+msgParsed.slot+'').css('-webkit-filter','none');
      $(''+msgParsed.slot+'').removeClass();
      $(''+msgParsed.slot+'').addClass('playercard');
      $(''+msgParsed.slot+'').html();
      
      if(msgParsed.team == "red") {
        $(''+msgParsed.slot+'').addClass('overturned_red');
      } else {
        $(''+msgParsed.slot+'').addClass('overturned_blu');
      }
      
      if(msgParsed.player) {	
        $("#"+msgParsed.player).css('-webkit-filter','brightness(1.0)');
      }
		}
	}
});

// execute after all of the graphics have loaded
$(window).load(function() {  
  console.log("[DotaFortress] Page Loaded");
  var url = $.url();
  if (url.param('raiseshutters') == 'true') {
    console.log("[DotaFortress] RaiseShutters is set to 'true'. Sending 'raiseshutters' message.");
    var messages = [];
    var hostname = 'http://'+document.location.hostname+':1337';
    var socket = io.connect(hostname);
    sendMessage(socket, 'raiseshutters', '');
  }
});