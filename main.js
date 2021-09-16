const $container = $("#container")
const $shootBall = $('#shootBall')

let color, randomColor1, randomColor2, randomColor3
let newRowInterval

// Utility
const chooseColor = () => (color[Math.floor(Math.random() * color.length)])
const createNewRow = () => {
  const elem =  `
    <div class="ballsSet1 ball"></div>
    <div class="ballsSet2 ball"></div>
    <div class="ballsSet3 ball"></div>
  `
  $container.prepend(elem)

  $(".ballsSet1").css('background-color', chooseColor())
  $(".ballsSet2").css('background-color', chooseColor())
  $(".ballsSet3").css('background-color', chooseColor())
}

// Collision Detection
const collisionNew = function (rect1, rect2) {
  let r1x = rect1.offset().left
  let r1y = rect1.offset().top
  let r1w = rect1.width()
  let r1h = rect1.height()
  let r2x = rect2.offset().left
  let r2y = rect2.offset().top
  let r2w = rect2.width()
  let r2h = rect2.height()

  if (r1x < (r2x +r2w) &&
      (r1x + r1w) > r2x &&
      r1y < (r2y + r2h) &&
      (r1y + r1h) > r2y) {
    return true
  }
}


const resetShooting = () => {
  $shootBall
    .css({left: 100, top: 350})
    .css('background-color', chooseColor())
}

//click to shoot, collision, reset
const clickShootEvent = () => {
  $shootBall.click(() => {
    $shootBall.animate({
      left: "+=350"
    }, {
      duration: 1000,
      step: () => {
        if (collisionNew($shootBall, $(".ballsSet1"))) {
          if ($shootBall.css('background-color') === $(".ballsSet1").css('background-color')) {
            resetShooting()
            // $(".ballsSet1").hide()
            createNewRow()
            scoreAdd()
          }
        }

        if (collisionNew($shootBall, $(".ballsSet2"))) {
          if ($shootBall.css('background-color') === $(".ballsSet2").css('background-color')) {
            resetShooting()
            // $(".ballsSet2").hide()
            createNewRow()
            scoreAdd()
          }
        }

        if (collisionNew($shootBall, $(".ballsSet3"))) {
          if ($shootBall.css('background-color') === $(".ballsSet3").css('background-color')) {
            resetShooting()
            // $(".ballsSet3").hide()
            createNewRow()
            scoreAdd()
          }
        }

      },
      complete: () => {
        resetShooting()
      }
    })
  })
}
clickShootEvent()

const randomColor = () => (`#${('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)}`)
//arrow keys to move the shooting rectangle
const handleArrowKeys = (e) => {
  switch (e.keyCode) {
    case 37:
      $shootBall.finish().animate({left:"-=10"}, 170, 'linear')
      break;

    case 38:
      $shootBall.finish().animate({top:"-=10"}, 170, 'linear')
      break;

    case 39:
      $shootBall.finish().animate({left:"+=10"}, 170, 'linear')
      break;

    case 40:
      $shootBall.finish().animate({top:"+=10"}, 170, 'linear')
      break;
  }
}

const init = () => {
  randomColor1 = randomColor()
  randomColor2 = randomColor()
  randomColor3 = randomColor()
  color = [randomColor1, randomColor2, randomColor3]

  $shootBall.css('background-color', chooseColor())
  $shootBall.css({left: 100, top: 350})

  $(".ballsSet1").css('background-color', randomColor1)
  $(".ballsSet2").css('background-color', randomColor2)
  $(".ballsSet3").css('background-color', randomColor3)

  $(document).keydown(handleArrowKeys)

  $("#score").text("0")

  $("#time").text("0")

  //create new rows of rect every 1 min
  // newRowInterval = setInterval(createNewRow, 5000)
}

init()

const scoreAdd = () =>{
  let i= Number($("#score").text()) + 5
  return $("#score").text(i)
}

const scoreDeduct = () =>{
  let iMinus = Number($("#score").text()) - 5
  return $("#score").text(iMinus)
}

//
let elemArray= [$(".ballsSet1"), $(".ballsSet2"), $(".ballsSet3")]

let elemArrayRandom =  elemArray[Math.floor(Math.random() * color.length)]

const removeElem = function () {
  elemArrayRandom.hide()
}
removeElemInterval = setInterval(removeElem, 10000)
scoreDeductInterval = setInterval(scoreDeduct, 20000)

//
const LoseAndWin = function () {
  if (Number($("#score").text()) <= 100) {
    // $("#message").append(`<h3>Virus Lose. Human Win. Restart the Spread</h3>`)
    $("#game-over").css("display", "block")
    return $("#time").text("-1")
  } else {
    // $("#message").append(`<h3>You successfully contaminated the entire world.<h3>`)
    $("#you-win").css("display", "block")
    return $("#time").text("-1")
  }
}

countingLose = setInterval(LoseAndWin, 60000)

//
const Timer = () =>{
  let t = Number($("#time").text()) + 1
  return $("#time").text(t)
}

countingTime = setInterval(Timer, 1000)
