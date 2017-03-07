var KM = {player1UP:81,player1DOWN:65,player2UP:38,player2DOWN:40,player3UP:67,player3DOWN:86,player4UP:75,player4DOWN:76};

var KM_P = [['player1UP','player1DOWN'],['player2UP','player2DOWN'],['player3UP','player3DOWN'],['player4UP','player4DOWN']];
var howManyPlayer = 0;
var playerConected = {canMap:[],count:0};

var bPos = {x:50,y:50,w:10,h:10}; 
var pPos1 = {x:10,y:200,w:10,h:100};
var pPos2 = {x:110,y:200,w:10,h:200};
var bDir = {x:-1,y:1};
var punkte = {p1:0,p2:0,p3:0,p4:0};

var canObjs = {
	player: [],
	balls: [],
	field: []
};

function init() {
	console.log("We are ready!");
	
	initPlayerFour([{color:'blue'},{color:'yellow'},{color:'green'},{color:'red'}]);
		
	playSwitch();
	
	}
	
function draw() {
		
	var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
  	fps += (thisFrameFPS - fps) / fpsFilter;
  	lastUpdate = now;
	animationID = requestAnimationFrame(draw);
	
	bPos.x += bDir.x*6;
	bPos.y += bDir.y*4;
	for(var g in {field:'f',player:'p'}) {
		var tmpObj = canObjs[g];
		for(var f in tmpObj) {
			for(var b in canObjs.balls) {
				var hit = tmpObj[f].collision(canObjs.balls[b]);
			}
		}
	}

	for(var b in canObjs.balls) {
		var tB = canObjs.balls[b];
		tB.move();
		if(tB.X<0 || tB.X>WIDTH || tB.Y<0 || tB.Y>HEIGHT) {
			tB.X=WIDTH/2;
			tB.Y=HEIGHT/2;
			tB.dirx*=-1;
			tB.diry*=-1;
			tB.setColor("rgba(255,255,255,1)","rgba(255,255,255,1)");
		}
	}
	
	for(var h = 0;h<=howManyPlayer-1;h++) {	
		if(keys[ KM_P[h][1] ]) canObjs.player[h].move(5);
		if(keys[ KM_P[h][0] ]) canObjs.player[h].move(-5);
	}
	
	clearCTX();
	
	for(var b in canObjs.balls) {
		canObjs.balls[b].draw();	
	}

	for(var f in canObjs.field) {
		canObjs.field[f].draw();	
	}
	
	for(var p in canObjs.player) {
		canObjs.player[p].draw();	
	}

	var iFPS = parseInt(fps);
	$("#topMiddle").html(""+iFPS);
	$("#punkte1").html(punkte.p1);
	$("#punkte2").html(punkte.p2);
}
