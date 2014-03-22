$(document).ready(function (){
    var messages = [];
    var dashHostname = 'http://'+document.location.hostname+':1337';
    var dashSocket = io.connect(dashHostname);
    
    dashSocket.on('message', function (data) {
        switch(data.message) {
			case 'showdonations':
                showStats(data);
                break;
			case 'hidedonations':
                hideStats();
                break;
			case 'newdonation':
				newDonation(data);
				break;
        }
     });
	
	//*----- DONATIONS -----*//  

  //init aggregate stats
  getAggregate();
    
	function newDonation(data) {
    $('#animated').queue(function( nxt ) {
        $('#tymsg').html('Thank you for your ' + data.content.amount.formatMoney() + ' donation, ');
        $('#donorname').html(data.content.donor__visiblename + '!');
        textFit($('#donorname'), {alignHoriz: true, alignVert: true});
        $(this).css({"transform":"translateY(-90px)"});
        nxt(); // continue the queue
      })
      .delay(3000)
      .queue(function( nxt ) {
          $(this).css({"transform":"translateY(0px)"});
          nxt(); // continue the queue
      })
      .delay(500);
    $('#stats').queue(function( nxt ) {
        $(this).css({"transform":"translateY(-90px)"});
        nxt(); // continue the queue
      })
      .delay(3000)
      .queue(function( nxt ) {
        $(this).css({"transform":"translateY(0px)"});
        nxt(); // continue the queue
      })
      .delay(500);

    getAggregate();
  }
  
  function getAggregate() {
    $.getJSON('http://tipofthehats.org/tracker?jsonp=?', null, function(data) {
      $('#IR_TOTAL').html(data.agg.amount.formatMoney());
      $('#IR_NUM_OF_CONTRIBUTIONS').html(data.agg.count);
    });
  }
    
  Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator, currencySymbol) {
    // check the args and supply defaults:
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
    decSeparator = decSeparator == undefined ? "." : decSeparator;
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator;
    currencySymbol = currencySymbol == undefined ? "$" : currencySymbol;

    var n = this,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;

    return sign + currencySymbol + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
  };
});
