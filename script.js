//Game variables and constants
const dino = document.querySelector("#dino");
const obstacle = document.querySelector("#obstacle");
const gameover = document.querySelector("#gameOver");
const button = document.querySelector("#btn");
const sc = document.querySelector("#score");
const survive = document.querySelector("#survive")
const storage = JSON.parse(localStorage.getItem('score')) || 0 //getting the local storage value or if the storage doesn't exist then putting 0
const highestscore = document.querySelector("#highestscore")

highestscore.innerHTML = `Highest Score: ${storage}`

let score = 0;
let cross = true; //for checking if the player jumped across the obstacle or not

obstacle.style.left = 1540 + "px" //on page load the obstacle will start from this position
let lastPainttime = 0 //For fps control purpose of obstacle
const animationIDobstacle = requestAnimationFrame(animate);
let animatetoggle = true //to stop the obstacle animation when the game is over

const gameoversound = new Audio("gameover.mp3")
const music = new Audio("music.mp3")
const jump = new Audio("jump.mp3")
music.play()

//for dino movement
document.addEventListener("keydown", function (event) {
  if (
    window.getComputedStyle(gameover).getPropertyValue("visibility") ===
    "hidden"
  ) {
    if (event.key === "ArrowUp") {
      jump.play()
      dino.classList.add("animatedino");
      setTimeout(() => {
        dino.classList.remove("animatedino");
      }, 750);
    }

    if (event.key === "ArrowRight") {
      const currentvalue = parseInt(
        window.getComputedStyle(dino).getPropertyValue("left")
      );
      if (currentvalue < 1300) {
        dino.style.left = `${currentvalue + 50}px`;
      }
    }

    if (event.key === "ArrowLeft") {
      const currentvalue = parseInt(
        window.getComputedStyle(dino).getPropertyValue("left")
      );
      if (currentvalue > 0) {
        dino.style.left = `${currentvalue - 50}px`;
      }
    }
  }
});

const gameID = requestAnimationFrame(gamefps)

function gamefps(ctime) {
  if (!animatetoggle) {
    cancelAnimationFrame(gameID)
    return //exit game loop
  }
  requestAnimationFrame(gamefps);
  console.log(ctime);

  gameEngine()
}


//logic for whether obstacle hits the player or not
function gameEngine() {
  const dinoX = parseInt(
    window.getComputedStyle(dino).getPropertyValue("left")
  );
  const obstacleX = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );
  const dinoY = parseInt(
    window.getComputedStyle(dino).getPropertyValue("bottom")
  );
  const obstacleY = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("bottom")
  );

  const offsetX = Math.abs(dinoX - obstacleX);
  const offsetY = Math.abs(dinoY - obstacleY);

  //logic if the player hits the obstacle or not
  if (offsetX < 90 && offsetY < 60) {
    gameover.style.visibility = "visible";
    button.style.visibility = "visible";
    survive.innerHTML = "You Lose 😂🤣"
    survive.style.visibility = "visible"

    obstacle.style.left = obstacleX + "px";

    dino.style.left = dinoX + "px";
    dino.style.bottom = dinoY + "px";
    dino.classList.remove("animatedino");

    //for storing the highest score
    if (storage < score) {
      localStorage.setItem('score', JSON.stringify(score));
    }
    
    music.pause()
    gameoversound.play()

    button.addEventListener("click", function () {
      setTimeout(() => {
        location.reload();
      }, 500);
    });
    animatetoggle = false
  } 

  //logic if the player scores
  else if ((offsetX < 160 && dinoX > obstacleX) && cross) {
    score++;
    sc.innerHTML = `Your Score: ${score}`;

    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    
  }
}


//Building obstacle animation fps
function animate(ctime) {
  if (!animatetoggle) {
    cancelAnimationFrame(animationIDobstacle)
    return //exit the animation loop
  }

  requestAnimationFrame(animate);

  //controlling the fps
  if ((ctime - lastPainttime) / 1000 < 0.01) {
    return
  }
  lastPainttime = ctime

  //animation getting rendered one frame per call

  animationEngine()
}


//obstacle animation
function animationEngine() {
  if (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) > -100) {
    
    //setting game difficulty

    if(score < 10){
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 7) + 'px';
    }
    else if(score >= 10 && score < 20){
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 10) + 'px';
    }
    else if(score >= 20 && score < 25){
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 11) + 'px';
    }
    else if(score >= 25 && score < 30){
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 13) + 'px';
    }
    else if(score >= 30 && score < 35){
      survive.style.visibility = "visible"
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 15) + 'px';
    }
    else if(score >= 35 && score < 40){
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 17) + 'px';
    }
    else if(score >= 40 && score < 50){
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 20) + 'px';
    }
    else if(score >= 50){
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 25) + 'px';
    }
    else if (score >= 60 && score < 70) {
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 30) + 'px';
    }
    else if (score >= 70 && score < 80) {
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 35) + 'px';
    }
    else if (score >= 80) {
      obstacle.style.left = (parseInt(window.getComputedStyle(obstacle).getPropertyValue("left")) - 40) + 'px';
    }

  }
  else {
    obstacle.style.left = 1540 + "px" //after completing the animation obstacle will restart it's position 
  }
}

//localStorage.removeItem('score');


