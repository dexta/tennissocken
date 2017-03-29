//
// # Tennis 4 two with remote joystick on separete device
//
// A simple game server using Socket.IO, Express, and Async.
//

var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var __base = __dirname+'/';
console.log("base path "+__base);
var config = require(__base+'nodeApp/config.js');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

var qr = require('qr-image');

var util = require('util');

router.use(express.static(path.resolve(__dirname, '')));

var sockets = {};

console.log("Server URL: "+config.serverURL);

var clientsConnected = {};
var gamesRunning = {player:[],serverId:0};
var playerQueue = [];
// var playerColor = ['red','blue','green','yellow'];

router.get('/get_qrcode', function(req,res) {
  var img = qr.imageSync(config.serverURL,{size: 15}); 
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(img, 'binary');  
});
router.get('/server_url',function(req,res) {
  res.send(config.serverURL);
});

io.on('connection', function (socket) {
    sockets[socket.id] = socket;
    socket.emit('connect',socket.id);

    socket.on('iamaserver',function(mydata) {
      console.log("New Server Started - id: "+socket.id);
      console.dir(mydata);
      gamesRunning.serverId = socket.id;
      collectPlayer(socket);
    });

    socket.on('iamaclient',function(mydata){
      console.log("new Player - id: "+socket.id);
      playerQueue.push(socket.id);
      console.log("player in Queue "+playerQueue.length);
      collectPlayer(socket);
    });

    socket.on('joystick',function(doMove){
      if(!gamesRunning.serverId||false) return;
      var playerData;
      // console.log('move data '+socket.id);
      // console.dir(doMove);
      for(var g in gamesRunning.player) {
        if(gamesRunning.player[g].socketId===socket.id) {
          playerData = gamesRunning.player[g];
        }
      }
      doMove.player = playerData;
      sockets[gamesRunning.serverId].emit('doMove',doMove);
    });

    socket.on('disconnect', function () {
      if(playerQueue.indexOf(socket.id)!=-1) {
        playerQueue.splice(playerQueue.indexOf(socket.id),1);
        console.log("kick player in Queue");
        console.dir(playerQueue);
      }
      for(var d in gamesRunning.player) {
        if(gamesRunning.player[d].socketId===socket.id) {
          gamesRunning.player.splice(d,1);
          console.log("delete player in gamesRunning ");
          console.dir(gamesRunning.player);
          break;
        }
      }
      if(gamesRunning.socketId!=0&&gamesRunning.socketId!=socket.id) {
        sockets[gamesRunning.serverId].emit("playerGone",socket.id);
      }

      delete sockets[socket.id];
    });

    socket.on('playerSettingsFromServer',function(config){
      console.dir(config);
      sockets[config.socketId].emit('playerSettingsToClient',config);
    });

  });

function collectPlayer(socket) {
  if(playerQueue.length>0 && (gamesRunning.serverId||false) ) {
    var newPlayer = {socketId:0};
    newPlayer.socketId = playerQueue.splice(0,1)[0];
    console.log("new Client conected ! "+newPlayer.socketId);
    gamesRunning.player.push(newPlayer);
    sockets[gamesRunning.serverId].emit('newPlayer',newPlayer);
    socket.emit('welcomePlayer',newPlayer);
    // console.dir(gamesRunning);
    collectPlayer(socket);
  }
}

function generateQRcode(toCode) {
  var img = qr.imageSync(toCode);
  return img.toString('base64');
}

function broadcast(event, data) {
  for(var s in sockets) {
    sockets[s].emit(event, data);
  }
}

server.listen(config.server.port || 9423, config.server.ip || "0.0.0.0", function(){
  var serverInfo = server.address();
  console.log("Chat server listening at", serverInfo.address + ":" + serverInfo.port);
});