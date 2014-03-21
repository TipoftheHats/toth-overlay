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
        "transition_out",
        "roster_in_9",
        "roster_in_6",
        "roster_out"
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
        playTransition(data);
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
    $.ionSound.play("socialmedia_in-v2");

    $('#links').transition({
        'width': '31.25%'
      }, 500, 'linear');

    $('#linktext').delay(475)
      .transition({
        'top': '0px'
      }, 500, 'ease');

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
  }

  function hideLinks () {
    //play sound
    $.ionSound.play("socialmedia_out-v2");

    $('#linktext').transition({
        'top': '-238px'
      }, 500, 'ease');
      
    setTimeout(hideHat, 500);
    setTimeout(shrinkOut, 450);

    function shrinkOut () {
      $('#links').transition({
        'width': '0%'
      }, 500, 'linear');
      $('#hattycontainer').transition({
        'right': '555px'
      }, 370, 'linear');
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
      $('#alerttitlecontainer').css('background-color', '#F37424');
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

      $('#lowerthirdtitlecontainer').css('background-color', '#F37424')
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

  //*----- TRANSITION -----*//
  
  var numSlices = 8;
  var currentAnim = '';
  var inTrans = false;
  
  var obsRemoteURL = 'ws://localhost:4444';
  var obsSocket = new WebSocket(obsRemoteURL, "obsapi");
  
  function playTransition (data) {
    //don't start a new transition one is playing
    if (inTrans == true) {
      //return;
    }
    
    var msgParsed = JSON.parse(data.content);    
    var anim = msgParsed.anim;
    var type = msgParsed.type; //inOnly, outOnly, full
    var scene = msgParsed.scene;
    console.log(scene);    
    
    //set up json request for obs scene change             
    var msg = {"request-type": "SetCurrentScene", "scene-name": scene, "message-id": 1};
    
    if (anim == 'drop') {      
      if (type == 'inOnly') {
        console.log('dropInOnly');
        dropIn();
        return;
      } else if (type == 'outOnly') {
        console.log('dropOutOnly');
        dropOut();
        return;
      }else if (type == 'full') {
        console.log('dropFull');
        dropIn();
        setTimeout(dropOut, 900);
      }      
    } else if (anim == 'angle') {      
      if (type == 'inOnly') {
        console.log('angleInOnly');
        angleIn();
        return;
      } else if (type == 'outOnly') {
        console.log('angleOutOnly');
        angleOut();
        return;
      }else if (type == 'full') {
        console.log('angleFull');
        angleIn();
        setTimeout(angleOut, 800);
      }
    }
    
    /* ANIMATION FUNCTIONS */
    // drop
    function dropInit() {
      //programmatically generate shutter slices
      $('#shuttercontainer').html('');
      for (var i = 1; i <= numSlices; i++) {
        $('#shuttercontainer').append('<div id="shutter' + i +
          '" class="shutter"><img src="../img/logo_slices/logo_slice' + i + '.png"></div>');
        var bgGradient = shadeColor("#f37424", -15 * (numSlices - i + 1)); //invert, dark to light
        $('#shutter' + i).css({
          'left': (1 / numSlices) * (i - 1) * 100 + "%",
          'background-color': shadeColor("#fdfdfe", -15 * i), //light to dark
          'background-image': '-webkit-linear-gradient(top, rgba(255,205,40,0) 10%, ' + bgGradient +' 99%)'
        });
      }
    }
    
    function dropIn () {
      inTrans = true;
      dropInit();
    
      // play sound
      //$.ionSound.play("transition_in");
    
      for (var i = 1; i <= numSlices; i++) {
        $('#shutter' + i).delay((i - 1) * 50)
          .transition({
            'top': '0%',
            'background-position-y': '0px'
          }, 400, 'ease-out')
      }
      
      //trigger scene change in obs
      setTimeout(function(){
        obsSocket.send(JSON.stringify(msg));
      }, 800);
    }
    
    function dropOut () {
      // play sound
      //$.ionSound.play("transition_out");
      
      for (var i = 1; i <= numSlices; i++) {
        $('#shutter' + i).delay((i - 1) * 50)
          .transition({
            'top': '-100%',
            'background-position-y': '-5760px'
          }, 400, 'ease-out')
          .transition({
            'background-position-y': '7200px'
          }, 1)
      }
      
      inTrans = false;
    }
    
    //angle
    function angleInit() {
      //programmatically generate shutter slices
      $('#shuttercontainer').html('');      
      for (var i = 1; i <= numSlices; i++) {
        $('#shuttercontainer').append('<div id="shutter' + i + '" class="shutter"></div>');
        $('#shutter' + i).css({
          'left': (1 / numSlices) * (i - 1) * 100 + "%",
          'top': (1 / numSlices) * (i - 1) * 100 + "%",
          '-webkit-transform': 'translate(50%, -50%) rotate(60.65deg) translate3d(0,0,0)',
          'height': 2000,
          'width': 158,
          'background-color': shadeColor("#fdfdfe", -15 * i), //light to dark,
          '-webkit-mask': '-webkit-linear-gradient(top, black, black) no-repeat center top',
          '-webkit-mask-size': '100% 0%'
        });
        
        //flip mask for every other shutter slice
        if (i % 2 == 0) {
          $('#shutter' + i).css({
            '-webkit-mask': '-webkit-linear-gradient(bottom, black, black) no-repeat center bottom',
            '-webkit-mask-size': '100% 0%'
          });
        }      
      }
    }
    
    function angleIn() {
      inTrans = true;
      angleInit();
      
      for (var i = 1; i <= numSlices; i++) {
        console.log('animating ' + i);
        $('#shutter' + i).transition({
          '-webkit-mask-size': '100% 100%'
        }, 700, 'cubic-bezier(0.260, 0.860, 0.440, 0.985)');
      }
      
      //animate center logo
      $('#logo').css('opacity', '100');
      $('#logo').removeClass('bounceOut');
      $('#logo').addClass('animated bounceIn');      
      $('#logo').on('webkitAnimationEnd', 
      function() {
        
        $('#logo').removeClass('bounceIn');
      });
      
      //trigger scene change in obs
      setTimeout(function(){
        obsSocket.send(JSON.stringify(msg));
      }, 700);
    }

    function angleOut() {
      for (var i = 1; i <= numSlices; i++) {
        //flip the masks so they transition out the other way
        if (i % 2 == 0) {
          $('#shutter' + i).css({
            '-webkit-mask': '-webkit-linear-gradient(top, black, black) no-repeat center top',
            '-webkit-mask-size': '100% 100%'
          });
        } else {
          $('#shutter' + i).css({
            '-webkit-mask': '-webkit-linear-gradient(bottom, black, black) no-repeat center bottom',
            '-webkit-mask-size': '100% 100%'
          });
        }
        
        $('#shutter' + i).transition({
          '-webkit-mask-size': '100% 0%'
        }, 700, 'cubic-bezier(0.56, 0.015, 0.74, 0.14)');
      }
      
      //animate center logo
      $('#logo').addClass('animated bounceOut');
      
      inTrans = false;
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
    if (!msgParsed.redRoster || !msgParsed.bluRoster || !msgParsed.teamNames) {
      console.error("[updateRosters] Could not parse roster data!");
      return;
    }
    
    var redRoster = msgParsed.redRoster;
    var bluRoster = msgParsed.bluRoster;
    var teamNames = msgParsed.teamNames;
    var rosterSize = Object.keys(redRoster).length;

    // plug the info from the control panel into the display
    updateRosters(redRoster, bluRoster, teamNames, rosterSize);

    // play sound
    $.ionSound.play("roster_in_" + rosterSize);
    
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

  function updateRosters (redRoster, bluRoster, teamNames, rosterSize) {
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
      [ '<div class="leftheader cell">' + teamNames.red + '</div>',
        '<div class="classicon cell"></div>',
        '<div class="rightheader cell">' + teamNames.blu + '</div>'
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
    
    // play sound
    setTimeout(function () {
      $.ionSound.play("roster_out");
    }, step);
    
    // shoot in!
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
  }
});
