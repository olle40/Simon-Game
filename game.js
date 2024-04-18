var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
  nextSequence();
  started=true;
  } 
});

$(".btn").click(function (){
  var userChoosenColor=$(this).attr("id");
  userClickedPattern.push(userChoosenColor);

  playSound(userChoosenColor);
  animatePress(userChoosenColor);

  checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

 
function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3")
  audio.play();
}

function animatePress(currentColor){

  $("#"+currentColor).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColor).removeClass("pressed");
  },100);


}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    setTimeout(function(){
      $("body").addClass("game-over");
    },200);

    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
