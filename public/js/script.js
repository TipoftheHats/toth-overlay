$(document).ready(function () {
  // load Ion.Sound plugin
  $.getScript("js/ion.sound.min.js", function () {

    console.log("Ion.Sound loaded and executed.");

    $.ionSound({
      sounds: [           // set needed sounds names
        "alert_in-v2",
        "alert_out-v2",
        "lowerthird_in",
        "lowerthird_out",
        "socialmedia_in-v2",
        "socialmedia_out-v2",
        "transition_in",
        "transition_out"
      ],
      path: "snd/",       // set path to sounds
      multiPlay: true,    // can play multiple sounds at once
      volume: "0.15"      // not so loud please
    });
  });

  $.getScript("js/jquery.transit.min.js", function () {
    console.log("jQuery.Transit loaded and executed.");
  });

  var messages = [];
  var dashHostname = 'http://' + document.location.hostname + ':1337';
  var dashSocket = io.connect(dashHostname);

  dashSocket.on('message', function (data) {
    switch (data.message) {
      case 'showlinks':
        showLinks();
        break;
      case 'hidelinks':
        hideLinks();
        break;
      case 'pulselinks':
        pulseLinks(data.content);
        break;
      case 'showalert':
        showAlert(data);
        break;
      case 'showlowerthird':
        showLowerThird(data);
        break;
      case 'hidelowerthird':
        hideLowerThird();
        break;
      case 'pulselowerthird':
        pulseLowerThird(data);
        break;
      case 'transition':
        playTransition();
        break;
      case 'showrosters':
        showRosters(data);
        break;
      case 'hiderosters':
        hideRosters(data);
        break;
    }
  });

  //*----- LINKS -----*//

  function showLinks () {
    // play sound
    setTimeout(function () {
      $.ionSound.play("socialmedia_in-v2");
    }, 0);

    $('#links').css('width', '31.25%');
    $('#linktextcontainer').css('opacity', '100');

    setTimeout(slideDown, 475);
    showHat();

    function showHat () {
      $('#hattycontainer').css('opacity', '100');
      $('#hatty').css('transform-origin', '100% 0%');
      setTimeout(function () {
        $('#hatty').css('transform', 'translate3d( 0, 0px, 0px ) rotateX( 0deg )');
      }, 500);
      setTimeout(function () {
        $('#hatty').css('opacity', '100');
      }, 500);
      setTimeout(function () {
        $('#hatty').css('transform-origin', '50% 50%');
      }, 1000);
      setTimeout(function () {
        $('#hatty').addClass('animated pulseSmaller');
      }, 1000);
    }

    // doesn't work in obs, because BSP doesn't support perspective!
    /*function flipDown () {
      $('#linktextcontainer').css('transform','rotateX( 0deg )');
      $('#linktext').css('opacity','100');
    }*/

    function slideDown () {
      $('#linktextcontainer').css('transform', 'translateY(0px)');
      $('#linktext').css('opacity', '100');
    }
  }

  function hideLinks () {
    //play sound
    setTimeout(function () {
      $.ionSound.play("socialmedia_out-v2");
    }, 0);

    $('#linktextcontainer').css('transform', 'translateY(-194px)');
    setTimeout(hideHat, 500);

    setTimeout(shrinkOut, 450);

    function shrinkOut () {
      $('#links').css('width', '0');
      $('#linktextcontainer').css('opacity', '0');
      $('#linktext').css('opacity', '0');
      $('#hattycontainer').css('right', '555px');
    }

    function hideHat () {
      $('#hatty').removeClass('animated pulseSmaller');
      $('#hatty').css('animation-iteration-count', '1');
      $('#hatty').css('animation-duration', '1s');
      $('#hatty').addClass('animated bounceOut');

      setTimeout(resetHat, 1000);

      function resetHat () {
        $('#hattycontainer').css('opacity', '0');
        $('#hatty').css('opacity', '0');
        $('#hatty').removeClass('animated bounceOut');
        $('#hatty').css('transform', 'translate3d( 0, 100px, -100px ) rotateX( -90deg )');
        $('#hatty').css('transform', 'translate3d( 0, 100px, -100px ) rotateX( -90deg ) scale( 1.0 )');
        $('#hatty').css('animation-duration', '5s');
        $('#hatty').css('animation-iteration-count', 'infinite');
        $('#hattycontainer').css('right', '405px');
      }
    }
  }

  function pulseLinks (duration) {
    showLinks();
    setTimeout(hideLinks, (1000 * duration));
  }

  //*----- ALERT -----*//

  function showAlert (data) {
    if (data.content) {
      // play sound
      setTimeout(function () {
        $.ionSound.play("alert_in-v2");
      }, 0);

      $('#alerttext').text('' + data.content + '');
      $('#alert').css('width', '18.5em');
      $('#alerttitlecontainer').css('background-color', '#e7501e');
      setTimeout(function () {
        $('#exclamation').css('opacity', '100');
      }, 100);
      setTimeout(function () {
        $('#alerttextcontainer').css('height', '3.3em');
      }, 400);
      setTimeout(hideAlert, 7000);
    }
  }

  function hideAlert () {
    // play sound
    $.ionSound.play("alert_out-v2");

    $('#alerttextcontainer').css('height', '0');
    setTimeout(function () {
      $('#alert').css('width', '0');
    }, 400);
    setTimeout(function () {
      $('#exclamation').css('opacity', '0');
    }, 1000);
    setTimeout(function () {
      $('#alerttitlecontainer').css('background-color', '#ffcc28');
    }, 2000);
  }

  //*----- Lo3rd -----*//

  function showLowerThird (data) {
    var msgParsed = JSON.parse(data.content);
    if (msgParsed.text && msgParsed.title) {
      // play sound
      $.ionSound.play("lowerthird_in");

      $('#lowerthirdtitle').text('' + msgParsed.title.toUpperCase() + '');
      $('#lowerthirdtext').text('' + msgParsed.text + '');

      $('#lowerthirdtitlecontainer').css('background-color', '#e7501e')
        .transition({
          'left': '0%'
        }, 600, 'cubic-bezier(0.260, 0.860, 0.440, 0.985)');

      $('#shape').css('transition', 'left 500ms cubic-bezier(0.260, 0.860, 0.440, 0.985)')
        .css('left', '-145px');

      $('#lowerthirdtextcontainer').delay(25)
        .transition({
          'left': '0%'
        }, 600, 'cubic-bezier(0.260, 0.860, 0.440, 0.985)');
    }
  }

  function hideLowerThird () {
    // play sound
    $.ionSound.play("lowerthird_out");

    $('#lowerthirdtitlecontainer').transition({
      'left': '-100%'
    }, 300, 'cubic-bezier(0.260, 0.860, 0.440, 0.985)');

    $('#lowerthirdtextcontainer').delay(25)
      .transition({
        'left': '-100%'
      }, 300, 'cubic-bezier(0.260, 0.860, 0.440, 0.985)');

    $('#shape').delay(200)
      .transition({
        'left': '-190px'
      }, 700, 'cubic-bezier(0.260, 0.860, 0.440, 0.985)');
  }

  function pulseLowerThird (data) {
    var msgParsed = JSON.parse(data.content);
    showLowerThird(data);
    setTimeout(hideLowerThird, (1000 * msgParsed.duration));
  }

  //*----- SCENE -----*//

  for (var i = 1; i <= 8; i++) {
    $('#shutter' + i).slideUp(0);
    var newColor = shadeColor("#f95620", -15 * (i - 1));
    $('#shutter' + i).css('background-color', newColor);
  }

  function playTransition () {
    // play sound
    setTimeout(function () {
      $.ionSound.play("transition_in");
    }, 50);

    for (var i = 1; i <= 8; i++) {
      setTimeout(dropShutters, (i * 50));
    }

    var count = 1;

    function dropShutters () {
      $('#shutter' + count).slideDown(500);
      var newColor = shadeColor("#fdfdfe", -15 * (count - 1));
      $('#shutter' + count).css('background-color', newColor);
      count++;
    }

    setTimeout(openDoor, 1300);
  }

  function openDoor () {
    // play sound
    setTimeout(function () {
      $.ionSound.play("transition_out");
    }, 50);

    for (var i = 1; i <= 8; i++) {
      setTimeout(raiseShutters, (i * 50));
    }
    setTimeout(resetColor, 1300);

    var count = 1;

    function raiseShutters () {
      $('#shutter' + count).slideUp(500);
      count++;
    }

    function resetColor () {
      for (var i = 1; i <= 8; i++) {
        var newColor = shadeColor("#f95620", -15 * (i - 1));
        $('#shutter' + i).css('background-color', newColor);
      }
    }
  }

  function shadeColor (color, shade) {
    var colorInt = parseInt(color.substring(1), 16);

    var R = (colorInt & 0xFF0000) >> 16;
    var G = (colorInt & 0x00FF00) >> 8;
    var B = (colorInt & 0x0000FF) >> 0;

    R = R + Math.floor((shade / 255) * R);
    G = G + Math.floor((shade / 255) * G);
    B = B + Math.floor((shade / 255) * B);

    var newColorInt = (R << 16) + (G << 8) + (B);
    var newColorStr = "#" + newColorInt.toString(16);

    return newColorStr;
  }

  //*----- ROSTERS -----*//

  function showRosters (data) {
    var msgParsed = JSON.parse(data.content);
    if (!msgParsed.redRoster || !msgParsed.bluRoster) {
      console.error("[updateRosters] Could not parse roster data!");
      return;
    }
    
    var redRoster = msgParsed.redRoster;
    var bluRoster = msgParsed.bluRoster;
    var rosterSize = Object.keys(redRoster).length;

    // plug the info from the control panel into the display
    updateRosters(redRoster, bluRoster, rosterSize);

    // "Barn door wipe" transition
    var duration = 324;
    $('#rosterheader').transition({
      '-webkit-mask-size': '100% 100%'
    }, duration, 'ease-out');
    $('#rosterbody').transition({
      '-webkit-mask-size': '100% 100%'
    }, duration, 'linear');
    
    $('#classicon').addClass('cs_grad_down');
    
    // shoot out!
    for (var j = 1; j <= rosterSize; j++) {
      var step = duration / rosterSize;
      $('#leftroster > div:nth-child(' + j + ')')
        .delay(step * j)
        .queue(function( nxt ) {
          $(this).addClass('lr_grad_left');
          $(this).transition({
            'left': '0%',
          }, duration, 'ease-out');
          nxt(); // continue the queue
        });
      $('#rightroster > div:nth-child(' + j + ')')
        .delay(step * j)
        .queue(function( nxt ) {
          $(this).addClass('rr_grad_right');
          $(this).transition({
            'left': '0%',
          }, duration, 'ease-out');
          nxt(); // continue the queue
        }); 
    }
  }

  function updateRosters (redRoster, bluRoster, rosterSize) {
    // show player names
    var leftroster = '',
      classicon = '',
      rightroster = '';

    for (var i = 0; i < rosterSize; i++) {
      leftroster += '<div class="leftroster lr_grad_init">' + redRoster[i] + '</div>';
      classicon += '<div class="classicon"></div>';
      rightroster += '<div class="rightroster rr_grad_init">' + bluRoster[i] + '</div>';
    }

    $('#rosterheader').html(
      [ '<div class="leftheader cell">Team 1</div>',
        '<div class="classicon cell"></div>',
        '<div class="rightheader cell">Team 2</div>'
      ].join(''));
    $('#leftroster').html(leftroster);
    $('#classicon').html(classicon);
    $('#rightroster').html(rightroster);


    // add class icons
    if (rosterSize == 6) { // 6v6
      //scouts
      $('#classicon > div:nth-child(1)').css('background-position-y', -36 * 1);
      $('#classicon > div:nth-child(2)').css('background-position-y', -36 * 1);
      //soldiers
      $('#classicon > div:nth-child(3)').css('background-position-y', -36 * 2);
      $('#classicon > div:nth-child(4)').css('background-position-y', -36 * 2);
      //demo
      $('#classicon > div:nth-child(5)').css('background-position-y', -36 * 4);
      //medic
      $('#classicon > div:nth-child(6)').css('background-position-y', -36 * 7);
    } else { // highlander
      for (var j = 1; j <= rosterSize; j++) {
        $('#classicon > div:nth-child(' + j + ')').css('background-position-y', -36 * (j));
      }
    }
  }
  
  function hideRosters(data) {
    var rosterSize = parseInt(data.content);
    var duration = 324;
    var step = duration / rosterSize;
    
    // "Barn door wipe" transition
    $('#rosterheader')
      .delay(step * rosterSize)
      .transition({
        '-webkit-mask-size': '0% 100%'
      }, duration + (step * 2), 'ease-out');
    $('#rosterbody')
      .delay(duration)
      .transition({
        '-webkit-mask-size': '100% 0%'
      }, duration, 'linear');
    
    $('#classicon').removeClass('cs_grad_down');
    
    // shoot in!
    /*for (var j = 1; j <= rosterSize; j++) {
      $('#leftroster > div:nth-child(' + j + ')')
        .delay(step * (rosterSize - j))
        .transition({
          'left': '100%' 
        }, duration, 'ease-out');
      $('#rightroster > div:nth-child(' + j + ')')
        .delay(step * (rosterSize - j))
        .transition({
          'left': '-100%' 
        }, duration, 'ease-out');
    }*/
    
    for (var j = 1; j <= rosterSize; j++) {
      $('#leftroster > div:nth-child(' + j + ')')
        .delay(step * (rosterSize - j))
        .queue(function( nxt ) {
          $(this).removeClass('lr_grad_left');
          $(this).transition({
            'left': '100%',
          }, duration, 'ease-out');
          nxt(); // continue the queue
        });
      $('#rightroster > div:nth-child(' + j + ')')
        .delay(step * (rosterSize - j))
        .queue(function( nxt ) {
          $(this).removeClass('rr_grad_right');
          $(this).transition({
            'left': '-100%',
          }, duration, 'ease-out');
          nxt(); // continue the queue
        }); 
    }
  }
});
