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
      $("#slider-num-r").html($(this).slider('value') - 1);
      break;
    case "green":
      $("#slider-swatch-g").css("background-color","rgba(0,255,0,"+$(this).slider('value')/255+")");
      $("#slider-num-g").html($(this).slider('value') - 1);
      break
    case "blue":
      $("#slider-swatch-b").css("background-color","rgba(0,0,255,"+$(this).slider('value')/255+")");
      $("#slider-num-b").html($(this).slider('value') - 1);
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

$(document).ready(function(){
  initializeSliders();
  resetSliders();
})
