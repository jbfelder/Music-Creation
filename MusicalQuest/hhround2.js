//Simon says idea: press a,b,x,y to get familiar with each button & its sound

//when ready to begin, press start 




var hasGP = false;
var repGP;

var lastPressed = [];
var round2 = 0;
var number;
var sequence = [];
var index =0;

var sound3 = new Howl({
    src: ['RapSounds/StreetRoyalty_Clap.wav']
});

var sound1 = new Howl({
    src: ['RapSounds/Spyrography_Kick01.wav']
});


var sound2 = new Howl({
  src: ['RapSounds/PurpleDawn_CHat01.wav'],
  loop : false
});

var sound0 = new Howl({
  src: ['RapSounds/AllGrownUp_OHat.wav'],
});

var sounds = [sound0, sound1, sound2, sound3];

var wrongSound = new Howl({
  src: ['SampleSounds/Wrong-answer-sound-effect.mp3']
})

function canGame(){
  return "getGamepads" in navigator;
}

function randomNumber(){
  return Math.floor((Math.random()*4)+1);
}

function startGame(){
  sequence = [];
  lastPressed = [];
  round2 = 1;
  index = 0;
  newRound();
}

function newRound(){
  setTimeout(function () {
    if(round2==6){
      responsiveVoice.speak("You won Hiphop Simon Says!");
      responsiveVoice.speak("Continue on to play with all of the hiphop sounds however you like");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/hiphop.html";
      return;
    }
    number = randomNumber()-1;
    sequence.push(number);

      if(sequence[index]==0){
        sound0.play();
      }
      else if(sequence[index]==1){
        sound1.play();
      }
      else if(sequence[index]==2){
        sound2.play();
      }
      else if(sequence[index]==3){
        sound3.play();
      }
      index++;
      if(index<round2){
        newRound();
      }
  
    if(index==round2){
      var timeout = 5000 + (round2-1)*100;
      setTimeout(registerPress, timeout);
    }
  }, 500);
}

function registerPress(){

  for(var i=0; i<round2; i++){
    if(lastPressed[i]!=sequence[i]){
      console.log(lastPressed[i], sequence[i]);
      console.log(lastPressed.length, sequence.length);
      wrongSound.play();
      lastPressed = [];
      sequence = [];
      index = 0;
      return;
    }
  }
  lastPressed = [];
  index = 0;
  round2++;
  newRound();
}



function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];

    if(gp.buttons[16].pressed){
      responsiveVoice.speak("Returning to the tutorial page");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/tutorial.html";
    }

    if(gp.buttons[3].value>.5){
        sound3.play();
        lastPressed.push(3);
    }

    if(gp.buttons[1].value>0.5) {
        sound1.play();
        lastPressed.push(1);
    }

    if(gp.buttons[2].value>.5){
      sound2.play();
      lastPressed.push(2);
    }

    if(gp.buttons[0].value>.5){
      sound0.play();
      lastPressed.push(0);
    }

    if(gp.buttons[9].pressed){
      responsiveVoice.speak("starting game");
      //lastPressed = 9;
      setTimeout(startGame, 1000);
    }
    if(gp.buttons[6].pressed){
      responsiveVoice.speak("Going to Round 1");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/hiphopround1.html";
    }

    if(gp.buttons[7].pressed){
      responsiveVoice.speak("Going to the freestyle page");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/hiphop.html";
    }


}



$(document).ready(function(){

  responsiveVoice.speak("Welcome to round 2 of Hip Hop Simon Says. When you are ready, press start to begin the game");
  responsiveVoice.speak("To go back to round 1, press the L-T Trigger");
  responsiveVoice.speak("To go to the freestyle page, press the R-T Trigger");


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