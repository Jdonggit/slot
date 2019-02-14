window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000/60);
    };
})();


var c = document.getElementById('canvas');
var a = c.getContext('2d');
var w = c.width = 200;
var h = c.height = 950;
var _w = w * 0.5;
var _h = h * 0.8;
var arr = [];
var cnt = 0;

var c2 = document.getElementById('canvas2');
var a2 = c2.getContext('2d');
var w2 = c2.width = 200;
var h2 = c2.height = 950;
var _w2 = w2 * 0.5;
var _h2 = h2 * 0.5;
var arr2 = [];
var cnt2 = 0;
var alpha = [1,0.7];
var colors = ['#D94600','#FFD306','#FFED97'];
window.addEventListener('load', resize);
//window.addEventListener('resize', resize, false);

function resize() {
  c.width = w = 200;
  c.height = h = 1050;
  //c.style.position = 'absolute';
  //c.style.left =  150 + 'px';
 // c.style.top = 250 + 'px';
  
  c2.width = w2 = 200;
  c2.height = h2 = 1050;
 // c2.style.position = 'absolute';
 // c2.style.left = 1353 + 'px';
 // c2.style.top = 250 + 'px';
  
}

function anim() {
  cnt++;
  if (cnt % 2)draw();
  window.requestAnimFrame(anim);
}
anim();
function draw() {
	
  var splot = {
	x: 100,  
	y: rng(_h - 550, _h + 200),
    r: rng(16, 16),
    spX: rng(-2, 0),
    spY: rng(-1, 1),
	rgba: colors[ Math.round( Math.random() * 3) ],
	alpha: alpha[ Math.round( Math.random() * 2) ],
  };

  arr.push(splot);
  while (arr.length > 50) {
    arr.shift();
	
  }
  
  a.clearRect(0, 0, w, h);
  a2.clearRect(0, 0, w2, h2);

		

  for (var i = 0; i < arr.length; i++) {
    splot = arr[i];
    a.beginPath();
	
    a.arc(splot.x, splot.y, splot.r, 0, Math.PI * 2, true);
	if(splot.rgba == "#FFD306"){
		a.fillStyle = splot.rgba;
		//a.globalAlpha = 0.6;
	}else {
		a.fillStyle = splot.rgba;
	}
	a.globalAlpha = splot.alpha;
	a.shadowBlur = 20;
    a.shadowOffsetX = 2;
    a.shadowOffsetY = 2;
	a.shadowColor = 'white';	
    a.fill();

	
    a2.beginPath();
	if(splot.rgba == "#FFD306"){
		a2.fillStyle = splot.rgba;
		//a2.globalAlpha = 0.6;
	}else {
		a2.fillStyle = splot.rgba;
	}
	a2.save();
    a2.transform(-1, 0, 0, 1, w, 0);
    a2.arc(splot.x, splot.y, splot.r, 0, Math.PI * 2, true); 
	a2.globalAlpha = splot.alpha;
	a2.shadowBlur = 20;
    a2.shadowOffsetX = 2;
    a2.shadowOffsetY = 2;
	a2.shadowColor = 'white';
    a2.fill();
	a2.restore();
	
	splot.x = splot.x + splot.spX;
    splot.y = splot.y + splot.spY;
    splot.r = splot.r * 0.95;
 }
  
}
function rndCol() {
  var r =  Math.max(Math.floor(Math.random() * 255), 255);
  var g =  Math.max(Math.floor(Math.random() * 255), 100);
  var b = 150;
 
  return "rgb(" + r + "," + g + "," + b + ")";
}

function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}