
buttonColors = ["red", "blue", "green","yellow"];

gamePattern = [];

userClickedPattern = [];
var started = false;
var level = 0;
$(document).on("keydown",function(){
    startGame();
});

$("body").on("click", function(){
    startGame();
});

$(document).on("touchstart", function () {
  startGame();
});

function startGame(){
    if(!started){
        nextSequence();
        started = true;
        $("h1").text("Level "+level);
    }
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    level+=1;
    $("h1").text("Level "+level);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
}



$(".btn").on("click",function(event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    setTimeout(function(){
        started = false;
    },1000);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern.length = 0;
        }
    }
    else{
        console.log("failed");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game over, Press any key to restart");
        startOver();
    }
}

