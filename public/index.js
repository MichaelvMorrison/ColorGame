let r = 128, g = 128, b = 128;
let user_r = 128, user_g = 128, user_b = 128;
let time = 0;
let name = "";
let incrementTimer;

function initializeSliders(){
  $("#redslide, #greenslide, #blueslide").slider({
    orientation: "horizontal",
    range: "min",
    min: 0,
    max: 257,
    step: 1,
    value: 129,
    slide: slide
    // change: showOutput
  });
}

function slide(){
  switch(this.id.replace("slide","")){
    case "red":
      $("#slider-swatch-r").css("background-color","rgba(255,0,0,"+$(this).slider('value')/255+")");
      user_r = $(this).slider('value') - 1;
      $("#slider-num-r").html(user_r);
      break;
    case "green":
      $("#slider-swatch-g").css("background-color","rgba(0,255,0,"+$(this).slider('value')/255+")");
      user_g = $(this).slider('value') - 1;
      $("#slider-num-g").html(user_g);
      break
    case "blue":
      $("#slider-swatch-b").css("background-color","rgba(0,0,255,"+$(this).slider('value')/255+")");
      user_b = $(this).slider('value') - 1;
      $("#slider-num-b").html(user_b);
      break;
  }
}

function resetSliders(){
  $("#redslide").slider("value", 129);
  $("#greenslide").slider("value", 129);
  $("#blueslide").slider("value", 129);
  $("#slider-swatch-r").css("background-color", "rgba(255,0,0,0.5)");
  $("#slider-swatch-g").css("background-color", "rgba(0,255,0,0.5)");
  $("#slider-swatch-b").css("background-color", "rgba(0,0,255,0.5)");
  $("#slider-num-r").html("128");
  $("#slider-num-g").html("128");
  $("#slider-num-b").html("128");
}

function getRandomSwatch(){
  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);
  let color = "rgb("+r+","+g+","+b+")";
  $("#random-swatch").css("background-color",color);
}

function startTimer(){
  let s = 0;
  let m = 0;
  incrementTimer = setInterval(function(){
    time++;
    if (s == 60){
      m++;
      s = 0;
      if (m == 1){
        clearInterval(incrementTimer);
      }
    }else{
      s++;
    }
    $("#timer").html(m + ":" + ("0" + s).slice(-2));
  }, 1000);
}

function stopTimer(){
  console.log("here");
  clearInterval(incrementTimer);
}

function resetTimer(){
  time = 0;
  $("#timer").html("0:00");
  stopTimer();
}

function lockIn(){
  stopTimer();
  $("#score-user-swatch").css("background-color","rgb("+user_r+","+user_g+","+user_b+")");
  $("#score-random-swatch").css("background-color","rgb("+r+","+g+","+b+")");
  $("#lockIn").addClass("d-none");
  $("#playAgain-container").removeClass("d-none");
  $("#rgb-user-r").html(user_r);
  $("#rgb-user-g").html(user_g);
  $("#rgb-user-b").html(user_b);
  $("#rgb-random-r").html(r);
  $("#rgb-random-g").html(g);
  $("#rgb-random-b").html(b);
}

function resetModal(){
  $(".name-container").addClass("d-none");
  $(".score-container").removeClass("d-none");
  $("#name").val("");
  $("#name_error").html("");
  $("#rgb-user-r").html("");
  $("#rgb-user-g").html("");
  $("#rgb-user-b").html("");
  $("#rgb-random-r").html("");
  $("#rgb-random-g").html("");
  $("#rgb-random-b").html("");
  name = "";
}

function resetGame(){
  $("#lockIn").removeClass("d-none");
  $("#playAgain-container").addClass("d-none");
  resetSliders();
  getRandomSwatch();
  resetTimer();
  startTimer();
  resetModal();
}

function getName(){
  $(".name-container").removeClass("d-none");
  $(".score-container").addClass("d-none");
}

function saveScore(){
  if($("#name").val() && $("#name").val() != ""){
    name = $("#name").val();
    $("#scoreModal").modal("hide");
    console.log(name);
  }
  else{
    $("#name_error").html("Please enter a valid name")
  }
}

$(document).ready(function(){
  initializeSliders();
  resetSliders();
  getRandomSwatch();
  resetModal();

  $("#start").on("click",function(){
    $("#content-row").removeClass("d-none");
    $("#timer-col").html("<p id='timer' class='timer mb-0'>0:00</p>");
    startTimer();
    $("#lockIn").on("click",lockIn);
    $(".playAgain").on("click",resetGame);
    $("#getName").on("click",getName);
    $("#saveScore").on("click",saveScore);
  });
})
