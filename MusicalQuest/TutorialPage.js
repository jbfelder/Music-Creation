var hasGP = false;
var repGP;

function canGame(){
  return "getGamepads" in navigator;
}


function reportOnGamepad() {
      var gp = navigator.getGamepads()[0];


      if(gp.buttons[0].pressed){
        responsiveVoice.speak("A ");
        $("#header").html("A button!");
        };

      if(gp.buttons[1].pressed){
        responsiveVoice.speak("B ");
        $("#header").html("B button!");
        };

      if(gp.buttons[2].pressed){
        responsiveVoice.speak("X ");
        $("#header").html("X button!");
        };

      if(gp.buttons[3].pressed){
        responsiveVoice.speak("Y ");
        $("#header").html("Y button!");
        };

      if(gp.buttons[4].pressed){
        responsiveVoice.speak("L B ");
        $("#header").html("LB button!");
        };

      if(gp.buttons[5].pressed){
        responsiveVoice.speak("R B ");
        $("#header").html("RB button!");
        };

      if(gp.buttons[6].pressed){
        responsiveVoice.speak("L T ");
        $("#header").html("LT Trigger!");
        };

      if(gp.buttons[7].pressed){
        responsiveVoice.speak("R T ");
        $("#header").html("RT trigger!");
        };

      if(gp.buttons[8].pressed){
        responsiveVoice.speak("select button");
        $("#header").html("Select!");
        };

      if(gp.buttons[9].pressed){
        responsiveVoice.speak("start button");
        $("#header").html("Start!");
        };

      if(gp.buttons[10].pressed){
        responsiveVoice.speak("left stick");
        $("#header").html("Left stick!");
        };

      if(gp.buttons[11].pressed){
        responsiveVoice.speak("right stick");
        $("#header").html("Right stick!");
        };

      if(gp.buttons[12].pressed){
        responsiveVoice.speak("D-Pad Up");
        $("#header").html("D-Pad Up!");
        };

      if(gp.buttons[13].pressed){
        responsiveVoice.speak("D-Pad Down");
        $("#header").html("D-Pad Down!");

        };

      if(gp.buttons[14].pressed){
        responsiveVoice.speak("D-Pad Left");
        $("#header").html("D-Pad Left!");

        };

      if(gp.buttons[15].pressed){
        responsiveVoice.speak("D-Pad right");
        $("#header").html("D-Pad Right!");
        };

      if(gp.buttons[16].pressed){
        responsiveVoice.speak("Xbox button. Press this at any point to return to the tutorial page.");
        $("#header").html("Xbox Button");
      }

      //xbox one
      //you have pushed the home button. push this to go back to the tutorial page at any point 

}

$(document).ready(function(){

  responsiveVoice.speak("Welcome to the Tutorial page. Press any button to learn its name");
  responsiveVoice.speak("Click anywhere with your mouse to go back to the home page");

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

  $("html").click(function(e){
    responsiveVoice.speak("Going to the home page");
    document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/music.html";

  });

});