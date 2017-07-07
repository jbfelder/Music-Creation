var hasGP = false;
var repGP;

var i;


function canGame(){
  return "getGamepads" in navigator;
}

function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];

    //return to tutorial page
    if(gp.buttons[16].pressed){
      responsiveVoice.speak("Going to the tutorial page");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/tutorial.html";
    }

    if(gp.buttons[6].pressed){
      responsiveVoice.speak("Going to main page");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/music.html";
    }

    if(gp.buttons[7].pressed){
      responsiveVoice.speak("Going to Electro Round1");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/electroround1.html";
    }


//  'Y' button sound
    if(gp.buttons[3].pressed){
        var sound1 = new Howl({
            src: ['ElectroSounds2/Sideways_Snare.wav'],
            volume : .75,
        });
        sound1.play();

        var i = sound1;
        
    }

// 'B' button sound
    if(gp.buttons[1].pressed) {
        var sound2 = new Howl({
            src: ['ElectroSounds2/IceAge_Rim01.wav'],
            volume : .75,
        });
        sound2.play();

        var i = sound2;
    }

// 'X' button sound
    if(gp.buttons[2].pressed){
      var sound3 = new Howl({
          src: ['ElectroSounds2/LeWeekend_Kick.wav'],
          volume : .75,
      });
      sound3.play();

      var i = sound3;
    }

// 'A' button sound
    if(gp.buttons[0].pressed){
      var sound4 = new Howl({
          src: ['ElectroSounds2/Heliocentric_Clap.wav'],
          volume : .75,
      })
      sound4.play();

      var i = sound4; 
    }

// Start button begins loop
    if(gp.buttons[9].pressed){
    var sound = new Howl({
        src: ['ElectroSounds2/Swamp_120_Ambiance.wav'],
        loop : true,
        volume : .6,
    });
    sound.play();
    }

    if(gp.buttons[8].pressed){
      sound.stop();

    }


  
    }



$(document).ready(function(){

  responsiveVoice.speak("Welcome to Electro Creation")
  responsiveVoice.speak("Press A, B, X and Y to hear the available sounds");
  responsiveVoice.speak("When you are ready, press start to begin the background beat");
  responsiveVoice.speak("Press select to stop the background beat");
  responsiveVoice.speak("To return to the home page press L-T. To start a new game of electro Simon Says, press R-T");


if(canGame()){

    $(window).on("gamepadconnected", function(){
      hasGP = true;
      console.log("connection event");
      repGP = window.setInterval(reportOnGamepad,100);
    });

    $(window).on("gamepaddisconnected", function() {
                console.log("disconnection event");
                window.clearInterval(repGP);
            });

            //setup an interval for Chrome
            var checkGP = window.setInterval(function() {
                console.log('checkGP');
                if(navigator.getGamepads()[0]) {
                    if(!hasGP) $(window).trigger("gamepadconnected");
                    window.clearInterval(checkGP);
                }
            }, 500);

  }
  });
