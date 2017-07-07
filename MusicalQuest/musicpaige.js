var hasGP = false;
var repGP;

function canGame(){
	return "getGamepads" in navigator;
}



function reportOnGamepad() {
        var gp = navigator.getGamepads()[0];

        if(gp.buttons[4].pressed){
            responsiveVoice.speak("You selected electro");
            document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/electroround1.html";
        }
        if(gp.buttons[5].pressed){
            responsiveVoice.speak("You selected hip-hop");
            document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/hiphopround1.html";

        }

        if(gp.buttons[16].pressed){
            responsiveVoice.speak("Going to the tutorial page");
            document.location.href = "http://www.cs.unc.edu/Courses/comp580-s17/users/MusicalQuest/tutorial.html";
        }

    }




$(document).ready(function(){
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


    responsiveVoice.speak("Welcome to the Musical Creation");
    responsiveVoice.speak("For this game, you will need to use the full power of your imagination in order to create unique sounds and songs. If you want more of a challenge, there are also two types of 'Simon Says'. All games and sounds come from two genres: Electro and HipHop. Whenever you are ready, choose one of the following options:");
    responsiveVoice.speak("Electro is L-B Button, Hip-Hop is R-B Button, Tutorial is the xbox button");
   

});