var KM = {player1UP:81,player1DOWN:65,player2UP:38,player2DOWN:40,player3UP:67,player3DOWN:86,player4UP:75,player4DOWN:76};

var KM_P = [['player1UP','player1DOWN'],['player2UP','player2DOWN'],['player3UP','player3DOWN'],['player4UP','player4DOWN']];
var howManyPlayer = 0;

var bPos = {x:50,y:50,w:10,h:10}; 
var pPos1 = {x:10,y:200,w:10,h:100};
var pPos2 = {x:110,y:200,w:10,h:200};
var bDir = {x:-1,y:1};
var punkte = {p1:0,p2:0};

var canObjs = {
	player: [],
	balls: [],
	field: []
};

function init() {
	console.log("We are ready!");
	bPos.x = WIDTH/2; 
	bPos.y = HEIGHT/2;

	pPos1.y = HEIGHT/2-pPos1.h/2;
	pPos2.x = WIDTH-10-pPos2.w; 
	pPos2.y = HEIGHT/2-pPos2.h/2;
	
	// var xAxisPlayer = {X:10,Y:(HEIGHT/2)-50,W:10,H:100,collSide:'left',color:'red',axis:"x",minMovePos:0,maxMovePos:2342};
	// var yAxisPlayer = {X:(WIDTH/2)-50,Y:10,W:10,H:100,collSide:'top',color:'yellow',axis:"y",minMovePos:0,maxMovePos:2342};

	// var playerNumberOne = new canPlayer(ctx,10,50,10,400,'right','red');
	// $("#playerOne").css("background-color",playerNumberOne.rect.fillColor);
	// var playerNumberTwo = new canPlayer(ctx,(WIDTH-10-pPos2.w),50,10,400,'left','blue');
	// $("#playerTwo").css("background-color",playerNumberTwo.rect.fillColor);
	// var wallTestB = new canRect(ctx,0,0,WIDTH,10,'button');
	// var wallTestL = new canRect(ctx,WIDTH-10,0,10,HEIGHT,'left');
	// var wallTestT = new canRect(ctx,0,HEIGHT-10,WIDTH,10,'top');
	// var wallTestR = new canRect(ctx,0,0,10,HEIGHT,'right');

	// var theBall = new canBall(ctx,(WIDTH/2),(HEIGHT/2),10,10,-6,-4);
	// var theBall1 = new canBall(ctx,200,100,10,10,-16,-4);
	// var theBall2 = new canBall(ctx,400,200,10,10,-6,-14);

	// canObjs.player[0] = playerNumberOne;
	// canObjs.player[1] = playerNumberTwo;

	// canObjs.field.push(wallTestB);
	// // canObjs.field.push(wallTestL);
	// canObjs.field.push(wallTestT);
	// // canObjs.field.push(wallTestR);

	// canObjs.balls.push(theBall);
	// canObjs.balls.push(theBall1);
	// canObjs.balls.push(theBall2);

	// initPlayerOne([{color:'blue'}]);
	// initPlayerTwo([{color:'blue'},{color:'yellow'}]);
	// initPlayerThree([{color:'blue'},{color:'yellow'},{color:'green'}]);
	initPlayerFour([{color:'blue'},{color:'yellow'},{color:'green'},{color:'red'}]);
	// initPlayerZerro();
	
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
				// if(hit.indexOf("hit")!=-1){
				// 	console.log(hit);
				// }
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

// 	if(bPos.x<(WIDTH/2) && bDir.x<0) {
// 		if(bPos.y>pPos1.y) pPos1.y += 2;
// 		if(bPos.y<pPos1.y) pPos1.y -= 2;
// 		}
// 	if(bPos.x>(WIDTH/2) && bDir.x>0) {
// 		if(bPos.y>pPos2.y) pPos2.y += 3;
// 		if(bPos.y<pPos2.y) pPos2.y -= 3;
// 	}
	
	for(var h = 0;h<=howManyPlayer-1;h++) {	
		if(keys[ KM_P[h][1] ]) canObjs.player[h].move(5);
		if(keys[ KM_P[h][0] ]) canObjs.player[h].move(-5);
	}


	// if(howManyPlayer>=1) {
	// 	if(keys.player1DOWN) canObjs.player[0].move(5);
	// 	if(keys.player1UP) canObjs.player[0].move(-5);
	// } else if(howManyPlayer>=2) {		
	// 	if(keys.player2DOWN) canObjs.player[1].move(5);
	// 	if(keys.player2UP) canObjs.player[1].move(-5);
	// } else if(howManyPlayer>=3) {
	// 	if(keys.player3UP) canObjs.player[2].move(5);
	// 	if(keys.player3DOWN) canObjs.player[2].move(-5);
	// } else if(howManyPlayer===4) {
	// 	if(keys.player4UP) canObjs.player[3].move(5);
	// 	if(keys.player4DOWN) canObjs.player[3].move(-5);
	// }


// 	if(keys.player1DOWN) pPos1.y += 5;
// 	if(keys.player1UP) pPos1.y -= 5;
// 	if(keys.player2DOWN) pPos2.y += 5;
// 	if(keys.player2UP) pPos2.y -= 5;
// 	if(pointer[5] != 0) {
// 		var mtm = pointer[5]*3;
// 		(pointer[0]<(WIDTH/2))? pPos1.y += mtm: pPos2.y += mtm;
// 		pointer[5] = 0; pointer[4] = 0;
// 		}
	
// 	if(pPos1.y<0) pPos1.y = 0;
// 	if(pPos1.y>(HEIGHT-pPos1.h)) pPos1.y = (HEIGHT-pPos1.h);
// 	if(pPos2.y<0) pPos2.y = 0;
// 	if(pPos2.y>(HEIGHT-pPos2.h)) pPos2.y = (HEIGHT-pPos2.h);
	
// 	// shameless copy frome http://blog.mailson.org/2013/02/simple-pong-game-using-html5-and-canvas/
// 	// but do some simple math separation to avoid bugs
// if (bDir.x > 0) {
//         if (pPos2.x <= ( bPos.x + bPos.w ) && pPos2.x > ( bPos.x - (bDir.x + bPos.w) ) 
//             ) {
//             var collisionDiff = bPos.x + (bPos.w - pPos2.x);
//             var k = collisionDiff/bDir.x;
//             var y = bDir.y*k + (bPos.y - bDir.y);
//             if (y >= pPos2.y && y + bPos.h <= pPos2.y + pPos2.h) {
//                 // collides with right paddle
//                 bPos.x = pPos2.x - bPos.w;
//                 bPos.y = Math.floor( (bPos.y - bDir.y) + (bDir.y*k) );
//                 bDir.x *= -1;
//             }
//         }
//     } else {
//         if (pPos1.x + pPos1.w >= bPos.x) {
//             var collisionDiff = (pPos1.x + pPos1.w) - bPos.x;
//             var k = collisionDiff/-bDir.x;
//             var y = bDir.y*k + (bPos.y - bDir.y);
//             if (y >= pPos1.y && y + bPos.h <= pPos1.y + pPos1.h) {
//                 // collides with the left paddle
//                 bPos.x = pPos1.x + pPos1.w;
//                 bPos.y = Math.floor( (bPos.y - bDir.y) + (bDir.y*k) );
//                 bDir.x *= -1;
//             }
//         }
//     }		
	
// 	if(bPos.y<0 || (bPos.y+bPos.h)>HEIGHT) {
// 		bDir.y *= -1;
// 		}
// 	if(bPos.x<0 || (bPos.x+bPos.w)>WIDTH) {
// 		(bPos.x<0)? punkte.p2++:punkte.p1++;
// 		bPos.x = WIDTH/2;
// 		bDir.x *= -1;
// 		}
	
	clearCTX();
	
	// ctx.fillStyle = "rgb(255,255,255)";
	// ctx.beginPath();
	// ctx.fillRect(bPos.x,bPos.y,bPos.w,bPos.h);

	// ctx.fillRect(pPos1.x,pPos1.y,pPos1.w,pPos1.h);

	// //ctx.fillStyle = "rgb(0,0,255)";
	// ctx.fillRect(pPos2.x,pPos2.y,pPos2.w,pPos2.h);
	
	// ctx.fillStyle = "rgb(155,155,155)";
	// ctx.fillRect((WIDTH/2)-2,0,4,HEIGHT);
	
	// ctx.stroke();
	// ctx.fill();

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
