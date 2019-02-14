var canvas = document.getElementById('ball');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.Height = 150;
canvas.style.position = 'absolute';
canvas.style.top = '177px';
function clear(){
	ctx.clearRect(0,0,canvas.width,canvas.Height);
}

var markers = [];
markers[0] = {
  draw: function() {
	var imgx = new Image();
    imgx.onload = function () {
            ctx.drawImage(this,90,90);
    };
	imgx.src = '/mmc/images/yellow.png';
  }
};
markers[1] = {
  draw: function() {
	var imgx = new Image();
    imgx.onload = function () {
            ctx.drawImage(this,150,50);
    };
	imgx.src = '/mmc/images/red.png';
  }
};

markers[2] = {
  draw: function() {
	var imgx = new Image();
    imgx.onload = function () {
            ctx.drawImage(this,228,28);
    };
	imgx.src = '/mmc/images/blue.png';
  }
};

markers[3] = {
  draw: function() {
	var imgx = new Image();
    imgx.onload = function () {
            ctx.drawImage(this,308,8);
    };
	imgx.src = '/mmc/images/yellow.png';
  }
};


markers[4] = {
  draw: function() {
	var imgx = new Image();
    imgx.onload = function () {
            ctx.drawImage(this,655,8);
    };
	imgx.src = '/mmc/images/blue.png';
  }
};

markers[5] = {
  draw: function() {
	var imgx = new Image();
    imgx.onload = function () {
            ctx.drawImage(this,735,25);
    };
	imgx.src = '/mmc/images/red.png';
  }
};
markers[6] = {
  draw: function() {
	var imgx = new Image();
    imgx.onload = function () {
            ctx.drawImage(this,809,53);
    };
	imgx.src = '/mmc/images/yellow.png';
  }
};

markers[7] = {
  draw: function() {
	var imgx = new Image();
    imgx.onload = function () {
            ctx.drawImage(this,872,92);
    };
	imgx.src = '/mmc/images/blue.png';
  }
};

function go_bonus(){
	
 
	$("body").animate({   
        scrollTop: 0   
    },300); 
	var yiu = new Array();
	for(var i = 0 ; i<5 ; i++){
		 yiu[i] =  Math.round(Math.random()*(9-0));
	}
	 console.log(yiu);
	 slotRs(yiu);
	
}