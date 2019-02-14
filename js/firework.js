var firework;
var gctx;   // Graphic context
var fireworks = [];   // Each firework will be an element of this array

window.addEventListener("load", function() {
  firework = document.getElementById("firework");
  
  // If firework is supported
  if(firework.getContext) {
    firework.width = 2000;
    firework.height = 800;
    
    gctx = firework.getContext("2d");
    
    window.addEventListener("resize", handlePageResize);
    window.requestAnimationFrame(animationLoop);
  }
});

function animationLoop() {
  gctx.clearRect(0, 0, firework.width, firework.height);
  
  // Randomly generate a firework
  if(Math.random() < 0.05)
    fireworks.push(new Firework(Math.floor(Math.random()*firework.width), Math.floor(Math.random()*firework.height)));
  
  // Draw each firework in the array (so you can have multiple fireworks at the same time)
  fireworks.forEach(function(f) {
    // Draw a firework only if it still has visible particles
    if(!f.isFinished())
      f.draw(gctx);
  });
  
  window.requestAnimationFrame(animationLoop);
}

function handlePageResize() {
     firework.width = 2000;
    firework.height = 800;
}

function rnv(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Firework = function(_x, _y) {
  var targetX = rnv(500,1500);
  var targetY = rnv(300,500);
  var power = 3;  // Affects the movement speed of the particles
  var particles = [];
  var hue = Math.floor(Math.random()*360);
  
  var deadCount = 0;
  var numParticles = 60;
  
  var gravity = 0.8;
  var airResistence = 1.02;  // It must be greater than 1 to avoid weird results.
  
  this.draw = function(context) {
    // TODO - Animation should stop when all particles are invisible
    particles.forEach(function(p) {
      p.update(gravity, airResistence);
      p.draw(context);
    });
  };
  
  this.particleDead = function() {
    deadCount++;
  };
  
  this.isFinished = function() {
    return deadCount == numParticles;
  };
  
  for(var i=0; i<numParticles; i++) {
    var randomAngle = Math.random()*Math.PI*2;
    var dx = Math.cos(randomAngle)*(power*Math.random());
    var dy = Math.sin(randomAngle)*(power*Math.random());
    particles.push(new Particle(targetX, targetY,4, dx, dy, hue, this.particleDead));
  }
};

var Particle = function(_x, _y, _radius, _dx, _dy, _hue, onDeath) {
  var x = _x;
  var y = _y;
  var radius = _radius;
  var dx = _dx;
  var dy = _dy;
  var hue = _hue;
  var timeOfLife = 0;
  var opacity = 1;
  var dead = false;
  
  
  this.update = function(gravity, airResistance) {
    timeOfLife++;
    
    if(timeOfLife > 20 && !dead) {
    
      opacity -= 0.03;
      if(opacity < 0) {
        opacity = 0;
        dead = true;
        onDeath(); 
      }
    }
    
    x += dx;
    y += dy;
  };
  
  this.draw = function(context) {
    context.fillStyle = "hsla(" + hue + ", 100%, 70%, " + opacity + ")";
    context.fillRect(x, y-100, radius, radius);
  };
};