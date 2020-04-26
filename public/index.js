$(document).ready(function(){
  $("#redslide, #greenslide, #blueslide").slider({
    orientation: "horizontal",
    range: "min",
    max: 255,
    value: 127,
    // slide: showOutput,
    // change: showOutput
  });

  $("#redslide").slider("value", 150);
  $("#greenslide").slider("value", 50);
  $("#blueslide").slider("value", 100);
})
