//ship

function Ship(){
  this.pos = createVector(width/2, height/2);
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.friction = 0.8;
  this.velocity = createVector(0,0);
  this.isBoosting = false;
  this.removed = false;
  
  this.hits = function(asteroid) {
    // if(this.removed)return false;
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }
  
  //Thrust

  this.boosting = function(x){
    this.isBoosting = x;
  }

  this.update = function() {
    //if(this.removed)return;
    if (this.isBoosting){
      this.boost();
    }
    this.pos.add(this.velocity);
    this.velocity.mult(0.99);
  }
  this.boost = function(){
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.velocity.add(force);
  }

  //Render

  this.render = function(){
    if(this.removed) return;
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI/2);
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  }

  //rotation & turn

  this.shipRotation = function(angle){
    this.rotation = angle;
  }

  this.turn = function(){
    this.heading += this.rotation;
  }
  // pos reset

  this.edges = function(){
    if (this.pos.x > width + this.r){
      this.pos.x = -this.r;
    }
    else if (this.pos.x < -this.r){
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r){
      this.pos.y = -this.r;
    }
    else if (this.pos.y < -this.r){
      this.pos.y = height + this.r;
    }
  }
  this.remove = function() {
		this.removed = true;
	}
}
//bullets

function Bullet(spos, angle) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);

  this.update = function() {
    this.pos.add(this.vel);  
  }
  this.render = function() {
    push();
    stroke(255);
  	strokeWeight(4); 
    point(this.pos.x, this.pos.y);
    pop();
  }
  
  this.render = function(){
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }
  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }
  
}