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
        if(gamePattern[currentLevel-1] === userClickedPattern[currentLevel-1]){ // user got right at this time
            if (gamePattern.length === userClickedPattern.length){  // user finished the level
                setTimeout(function(){nextSequence();}, 1000);
            }
        }else {  // user got wrong 
            playSound('wrong');
            $("body").addClass('game-over');
            setTimeout(function(){
                $("body").removeClass("game-over"); 
            }, 100);
            startOver() 
            $("h1").text('Game Over, Press Any Key to restart!'); 
        } 
}

// get to color to do animate effect
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  
  //1. Create a new function called startOver().
  function startOver() {
    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    isFirst = true;
  }

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id"); //this.id;  
     userClickedPattern.push(userChosenColour); 
     playSound(userChosenColour);
     animatePress(userChosenColour);
     
     checkAnswer(userClickedPattern.length);
})

$(document).on("keydown", function(){  // $(document).keypress(function() {
    if(isFirst){
        nextSequence();
        isFirst = false;
        $("h1").text("Level " + level);
    }
})
