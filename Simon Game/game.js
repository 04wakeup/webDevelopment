 var buttonColours = ["red", "blue", "green", "yellow"];
 var gamePattern = [];

 function nextSequence(){
     var randomNumber = parseInt(Math.random() * 4);  // 0 ~ 3 random number gernerate
     var randomChosenColour = buttonColours[randomNumber];
     gamePattern.push(randomChosenColour); 
     $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
     setTimeout(function(){}, 1000);
     var soundEffect = new Audio('./sounds/' + randomChosenColour + '.mp3'); 
     soundEffect.play(); 
 }

 nextSequence();  

  