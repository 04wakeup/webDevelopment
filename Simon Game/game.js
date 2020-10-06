 var buttonColours = ["red", "blue", "green", "yellow"];
 var gamePattern = [];
 var userClickedPattern = [];
 var isFirst = true;
 var level = 0;

function nextSequence(){   
    userClickedPattern = [];
     var randomNumber = parseInt(Math.random() * 4);  // 0 ~ 3 random number gernerate
     var randomChosenColour = buttonColours[randomNumber];
     gamePattern.push(randomChosenColour); 
     $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
     setTimeout(function(){}, 1000);
     playSound(randomChosenColour);
     level ++;
     $("#level-title").text("Level " + level);
 }

function playSound(color){
    var soundEffect = new Audio('./sounds/' + color + '.mp3'); 
    soundEffect.play();
}

function checkAnswer(currentLevel){
    for (var i = 0; i < userClickedPattern.length; i++){
        if(gamePattern[i] == userClickedPattern[i]){ // user got right at this time
           
        }else {  // user got wrong 
            playSound('wrong');
            $("body").addClass('game-over');
            setTimeout(function(){
                $("body").removeClass("game-over"); 
            }, 100);
            startOver()
        }
    } 
    if (gamePattern.length === userClickedPattern.length){  // user finished the level
        setTimeout(function(){nextSequence();}, 1000);
    }
}

// get to color to do animate effect
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed"); 
    }, 100);
}

function startOver(){
      gamePattern = []; 
      isFirst = true;
      level = 0;
      $("h1").text('Game Over, Press Any Key to restart!');
      $("#level-title").text("Level " + level);
}

$(".btn").on("click", function(){
     var userChosenColour = $(this).attr("id"); //this.id; 
     userClickedPattern.push(userChosenColour); 
     console.log("hihi " + userClickedPattern);
     playSound(userChosenColour);
     animatePress(userChosenColour);
     
     checkAnswer(level);
})

$(document).on("keydown", function(){  // $(document).keypress(function() {
    if(isFirst){
        nextSequence();
        isFirst = false;
        $("h1").text("Level " + level);
    }
})
