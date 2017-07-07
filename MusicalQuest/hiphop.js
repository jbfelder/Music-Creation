//Simon says idea: press a,b,x,y to get familiar with each button & its sound

//when ready to begin, press start 




var hasGP = false;
var repGP;

var lastPressed = [];
var round1 = 0;
var round2 = 0;
var number;
var sequence = [];
var index;

var sound3 = new Howl({
    src: ['RapSounds/StreetRoyalty_Clap.wav'],
    volume : .75,
});

var sound1 = new Howl({
    src: ['RapSounds/Spyrography_Kick01.wav'],
    volume : .75,
});


var sound2 = new Howl({
  src: ['RapSounds/PurpleDawn_CHat01.wav'],
  volume : .75,
});

var sound0 = new Howl({
  src: ['RapSounds/DeepSeaDip_78_Dm_SynthBass.wav'],
  loop : true,
  volume : .6,
});

var sound4 = new Howl({
  src: ['RapSounds/AllGrownUp_OHat.wav'],
  volume : .75
});

var sounds = [sound0, sound1, sound2, sound3];

var wrongSound = new Howl({
  src: ['SampleSounds/Wrong-answer-sound-effect.mp3']
})

function canGame(){
  return "getGamepads" in navigator;
}



function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];

    if(gp.buttons[16].pressed){
      responsiveVoice.speak("Going to the tutorial page");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/tutorial.html";
    }

    if(gp.buttons[6].pressed){
      responsiveVoice.speak("Going to main page");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/music.html";
    }

    if(gp.buttons[7].pressed){
      responsiveVoice.speak("Going to HipHop Round1");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/hiphopround1.html";
    }

    //  'Y' button sound
    if(gp.buttons[3].pressed){
        sound1.play();
        
    }

// 'B' button sound
    if(gp.buttons[1].pressed) {
        sound2.play();

    }

// 'X' button sound
    if(gp.buttons[2].pressed){
      sound3.play();

    }

// 'A' button sound
    if(gp.buttons[0].pressed){
      sound4.play();
     
    }

// Start button begins loop
    if(gp.buttons[9].pressed){
    sound0.play();
    }

    if(gp.buttons[8].pressed){
      sound0.stop();

    }
    

}



$(document).ready(function(){

  responsiveVoice.speak("Welcome to hiphop creation")
  responsiveVoice.speak("Press A, B, X and Y to hear the available sounds");
  responsiveVoice.speak("When you are ready, press start to play the background beat");
  responsiveVoice.speak("Press select to stop the background beat");
  responsiveVoice.speak("To return to the home page press L-T. To start a new game of hip hop Simon says press R-T");

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
