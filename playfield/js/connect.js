var socket = io(window.location.origin);

var howManyPlayer = 4;
var playerConected = 0;
var playerKeys = []
socket.on('connect', function(id){
  console.log(id);
  setTimeout(function() {
    socket.emit('iamaserver',{randomString:"3//dice profed"});  
  },500);
  
});

function findBySocket(socketId) {
  for(var p=1;p<=4;p++) {
    if(socketId===player[p].socketId) {
      return player[p];
    }
  }
  return false;
}
function findNextPlayer() {
  return findBySocket(0);
}

socket.on('doMove', function(data){
  // console.dir(data);
  if(!(data.player||false)) return;
  var pl = findBySocket(data.player.socketId||false);
  if(!pl) return;
  if(data.move==='up') {
    pl.velocity = 8;  
  } else if(data.move==='down') {
    pl.velocity = -8;
  } else if(data.state==='end') {
    pl.velocity = 0;
  }
});

socket.on('playerGone',function(hisSocketId) {
  var gonePlayer = findBySocket(hisSocketId);
  console.dir(gonePlayer);
  gonePlayer.socketId = 0;
  console.log("player disconected - id: "+hisSocketId);
  playerConected--;
  gonePlayer.animRun = true;
  gonePlayer.animType = false;
});

socket.on('newPlayer',function(newPlayer){
  if(howManyPlayer>playerConected) {

   var localPlayer = findNextPlayer();
   if(!localPlayer) {
      console.log("to many player");
      return;
   }
   localPlayer.sprite.visible = true;
   localPlayer.connected = true;
   localPlayer.animRun = true;
   localPlayer.animType = true;
   // player[newPlayer.playerNo].blockWall = playerBricks[newPlayer.playerNo];
   playerConected++;

   localPlayer.socketId = newPlayer.socketId;
   newPlayer.playerNo = localPlayer.playerNo;
   newPlayer.axis = localPlayer.orient;
   var bg_maPimg = {
    1:"url('img/BG_Gelb.png')",
    2:"url('img/BG_Blau.png')",
    3:"url('img/BG_Pink.png')",
    4:"url('img/BG_Gruen.png')"
   };
   newPlayer.color = bg_maPimg[localPlayer.sprite.frame+1+""];
    console.log("new Player");
    console.dir(newPlayer);
    socket.emit('playerSettingsFromServer',newPlayer);
  }
  if(playerConected>=4) game.paused = false;
});

socket.on('urlQRcode',function(qrImage){
  document.getElementById('player1Score').style.backgroundImage = qrImage;
});