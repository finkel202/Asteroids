var ship;
var asteroids = [];
var bullets = [];
var score = 0;
var finalScore = 0;
var stars = [];
var bulletSound;
var isGameOver = false;



function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();

  soundFormats('mp3', 'wav');
  bulletSound = loadSound("assets/fire.wav");

  for (var i = 0; i < 15; i++) {
  	asteroids.push(new Asteroid());
  } 

  for (var i = 0; i < width / 10; i++) {
    stars.push(Star());
  }  
} 

function draw() {
  background(0);

  for (var i = 0; i < stars.length; i++) {
    stars[i].render();
  }

  textSize(40);
  text("Score: " + score, 10,30); 
  if (isGameOver) {
    ship.remove();
		textSize(90);
    text("Game Over",600,500);
    textSize(70);
    text("  Final Score: " + score, 580,600)
	} 

  for (var i = 0; i < bullets.length; i++){
    bullets[i].render();
    bullets[i].update();
  }

  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])){
      gameOver();
    }
    

    asteroids[i].render();
  	asteroids[i].update();
    asteroids[i].edges();
  }
    
  for (var i = bullets.length-1; i >= 0; i--) {
    bullets[i].render();
  	bullets[i].update();
    	for (var j = asteroids.length-1; j >= 0; j--) {
    		if (bullets[i].hits(asteroids[j])) {
    	    if (asteroids[j].r > 20) {
    	  		var newAsteroids = asteroids[j].breakup();
    	    	asteroids = asteroids.concat(newAsteroids);
    	    }
          asteroids.splice(j, 1);
          bullets.splice(i, 1);
          score++;
          if ( asteroids.length < 25) {     
            asteroids.push(new Asteroid());
          }
    	    break;
    		}
    	}
  }
  
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

//Controles

function keyReleased(){
  ship.shipRotation(0);
  ship.boosting(false);
}
  
 function keyPressed () {
  if(keyCode === RIGHT_ARROW){
  ship.shipRotation(0.1);
  }else if (keyCode === LEFT_ARROW){
    ship.shipRotation(-0.1);
  } else if (keyCode === UP_ARROW){
    ship.boosting(true);
    //thrustSound.play();
  }else if(key === " ") {
    bullets.push(new Bullet(ship.pos, ship.heading));
    bulletSound.play();
    }
  
}

function Star() {
  var pos = createVector(random(width), random(height));
  var a = random(50, 255);
  var weight = random(1, 4);

  function render() {
    push();
    stroke(255, a);
    strokeWeight(weight);
    point(pos.x, pos.y);
    pop();
  }

   return {
    render: render
  }
 
}
function gameOver() {
	if (isGameOver == false) {
    finalScore = score; 
	}
	isGameOver = true;
}


