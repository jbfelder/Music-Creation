//Simon says idea: press a,b,x,y to get familiar with each button & its sound

//when ready to begin, press start 




var hasGP = false;
var repGP;

var lastPressed = [];
var round1 = 0;
var number;
var sequence = [];
var index;

//  'Y' button sound
    var sound2 = new Howl({
      src: ['ElectroSounds2/Sideways_Snare.wav'],
      volume : .5,
    });


// 'B' button sound
    var sound1 = new Howl({
        src: ['ElectroSounds2/IceAge_Rim01.wav'],
        volume : .5,
    });


// 'X' button sound

    var sound3 = new Howl({
        src: ['ElectroSounds2/LeWeekend_Kick.wav'],
        volume : .5,
    });


// 'A' button sound
    var sound0 = new Howl({
        src: ['ElectroSounds2/Heliocentric_Clap.wav'],
        volume : .5,
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
  round1 = 0;
  newRound();
}



function newRound(){
  round1++;
  if(round1==6){
    responsiveVoice.speak("You have made it to round 2");
    document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/electroround2.html";
    return;
  }
  number = randomNumber()-1;
  sequence.push(number);
  for(var i=0; i<round1; i++){
    if(sequence[i]==0){
      responsiveVoice.speak(" A");
    }
    else if(sequence[i]==1){
      responsiveVoice.speak(" B");
    }
    else if(sequence[i]==2){
      responsiveVoice.speak(" X");
    }
    else if(sequence[i]==3){
      responsiveVoice.speak(" Y");
    }
  }
  var timeout = 5000 + (round1-1)*500;
  setTimeout(registerPress, timeout);

}



function registerPress(){

  for(var i=0; i<round1; i++){
    if(lastPressed[i]!=sequence[i]){
      console.log(lastPressed[i], sequence[i]);
      console.log(lastPressed.length, sequence.length);
      wrongSound.play();
      return;
    }
  }
  lastPressed = [];
  newRound();
}


function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];

    if(gp.buttons[16].pressed){
      responsiveVoice.speak("Going to the tutorial page");
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
      startGame();

    }
    if(gp.buttons[7].pressed){
      responsiveVoice.speak("Going to round 2");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/electroround2.html";
    }

    if(gp.buttons[6].pressed){
      responsiveVoice.speak("Going to the main page");
      document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/music.html";
    }

}



$(document).ready(function(){

  //responsiveVoice.speak("Press A, B, X and Y to hear the available sounds");
  responsiveVoice.speak("Welcome to round 1 of Electro Simon Says. Your goal is to press the same keys spoken to you. When you are ready, press start to begin the game");
  responsiveVoice.speak("To skip to round 2, press the R-T Trigger ");
  responsiveVoice.speak("To go back to the main page, press the L-T Trigger");


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