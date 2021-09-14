var randomColor1 = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
var randomColor2 = '#'+ ('000000' + Math.floor(Math.random()*16777113).toString(16)).slice(-6);
var randomColor3 = '#'+ ('000000' + Math.floor(Math.random()*16777123).toString(16)).slice(-6);

//create new rows of rect every 1 min
var myVar = setInterval(createNewRow, 10000)

function createNewRow() {
  $(".row").prepend(
  `<div class = "ballsSet1" ></div>
  <div class = "ballsSet2" ></div>
  <div class = "ballsSet3" ></div>
  <div class = "ballsSet4" ></div>
  <div class = "ballsSet5" ></div>`)

  $(".ballsSet1").css('background-color', randomColor2)
  $(".ballsSet2").css('background-color', randomColor1)
  $(".ballsSet3").css('background-color', randomColor3)
  $(".ballsSet4").css('background-color', randomColor2)
  $(".ballsSet5").css('background-color', randomColor1)

}

$(".ballsSet1").css('background-color', randomColor1)
$(".ballsSet2").css('background-color', randomColor2)
$(".ballsSet3").css('background-color', randomColor3)
$(".ballsSet4").css('background-color', randomColor1)
$(".ballsSet5").css('background-color', randomColor2)


const chooseColor = function () {
  let color = [randomColor1, randomColor2, randomColor3]
  colorToChoose = color[Math.floor(Math.random() * color.length)]
  return colorToChoose
}

$("#shootBall").css('background-color', chooseColor())

$("#shootBall").css({left: 350, top: 400})






//click to shoot, collision, reset
const clickShootEvent = function () {
$("#shootBall").click(function() {
  $("#shootBall").animate({
    top: "-=350"

  }, 1000, function() {

const afterHit = function () {
  if (collision($("#shootBall"), $(".ballsSet1"))) {
    if ($("#shootBall").css('background-color') === $(".ballsSet1").css('background-color')) {
      $("#shootBall").hide()
      $(".ballsSet1").hide()
      return resetShooting()
    }
  }

  if (collision($("#shootBall"), $(".ballsSet2"))) {
    if ($("#shootBall").css('background-color') === $(".ballsSet2").css('background-color')) {
      $("#shootBall").hide()
      $(".ballsSet2").hide()
      return resetShooting()
    }
  }

  if (collision($("#shootBall"), $(".ballsSet3"))) {
    if ($("#shootBall").css('background-color') === $(".ballsSet3").css('background-color')) {
      $("#shootBall").hide()
      $(".ballsSet3").hide()
      return resetShooting()
    }
  }

  if (collision($("#shootBall"), $(".ballsSet4"))) {
    if ($("#shootBall").css('background-color') === $(".ballsSet4").css('background-color')) {
      $("#shootBall").hide()
      $(".ballsSet4").hide()
      return resetShooting()
    }
  }

  if (collision($("#shootBall"), $(".ballsSet5"))) {
    if ($("#shootBall").css('background-color') === $(".ballsSet5").css('background-color')) {
      $("#shootBall").hide()
      $(".ballsSet5").hide()
      return resetShooting()
    }
  }
}

afterHit()

function resetShooting() {
  $("body").prepend(`<div id = "shootBall"></div>`)
  $("#shootBall").css('background-color', chooseColor())
  $("#shootBall").css({left: 350, top: 400})
  return clickShootEvent()
}

// function scoreAdd() {
//   let t = 0
//   if ($("#shootBall").hide()) {
//     newT = t + 5
//   }
//   $("#score").html(newT)
// }

});

});
}
clickShootEvent()

//arrow keys to move the shooting rectangle
$(document).keydown(function (e) {
  switch (e.which) {
    case 37:
      $("#shootBall").finish().animate({left:"-=10"})
      break;

    case 38:
      $("#shootBall").finish().animate({top:"-=10"})
      break;

    case 39:
      $("#shootBall").finish().animate({left:"+=10"})
      break;

    case 40:
      $("#shootBall").finish().animate({top:"+=10"})
      break;

  }
})


//collision detection
function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.height(true);
        var w1 = $div1.width(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.height(true);
        var w2 = $div2.width(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
      }
