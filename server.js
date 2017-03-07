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

var util = require('util');

router.use(express.static(path.resolve(__dirname, '')));

var sockets = {};

var clientsConnected = {};
var gamesRunning = {player:[]};
var playerQueue = [];
var playerColor = ['red','blue','green','yellow'];

io.on('connection', function (socket) {
    sockets[socket.id] = socket;
    socket.emit('connect',socket.id);

    socket.on('iamaserver',function(mydata) {
      console.dir(mydata);
      gamesRunning.serverID = socket.id;
      if(playerQueue.length>0) {
        collectPlayer(socket);
      }
    });
// make a player queue always then tell seek for server if they needed player
    socket.on('iamaclient',function(mydata){
      console.log("new Client in Queue");
      var newPlayer = {};
      newPlayer.socketID = socket.id;  
      playerQueue.push(newPlayer);
      socket.emit('welcomeInPlayerQueue',newPlayer);
      collectPlayer(socket);
    });

    socket.on('joystick',function(doMove){
      var playerData;
      for(var g in gamesRunning.player) {
        if(gamesRunning.player[g].socketID===socket.id) {
          playerData = gamesRunning.player[g];
        }
      }
      doMove.player = playerData;
      sockets[gamesRunning.serverID].emit('doMove',doMove);
    });


    socket.on('disconnect', function () {
      gamesRunning.player.splice(gamesRunning.player.indexOf(socket.id),1);
      console.log("peer disconnect "+(new Date())+" - "+socket.id);
      delete sockets[socket.id];
    });


    socket.on('playerSettingsFromServer',function(config){
      sockets[config.socketID].emit('playerSettingsToClient',config);
    });

  });

function collectPlayer(socket) {
  if(playerQueue.length>0 && (gamesRunning.serverID||false) ) {
    var playerNumber = gamesRunning.player.length;
    var newPlayer = playerQueue.splice(0,1)[0];
    console.log("new Client conected No.: "+playerNumber);
    newPlayer.color = playerColor[playerNumber];
    newPlayer.number = playerNumber;
    console.dir(newPlayer);
    gamesRunning.player.push(newPlayer);
    sockets[newPlayer.socketID].emit('welcomePlayer',newPlayer);
    sockets[gamesRunning.serverID].emit('newPlayer',newPlayer);
    console.dir(gamesRunning);
    collectPlayer(socket);
  }
}

function broadcastComrade(gameId) {
  if(!(gamesRunning[gameId]||false)) return;
  var gR = gamesRunning[gameId];
  var gameData = {
    search: gR.search,
    called: gR.called,
    timer: gR.timer,
    nameList: gR.nameList,
    player: gR.nameList[gR.plpos].name,
    WON: gR.playerWon
  };
  for(var c in gR.player) {
    var soID = gR.player[c].socketID;
    if(sockets[soID]||false) {
      console.log("sendGameData ID "+soID);
      sockets[soID].emit('getGameData',gameData);
    }
  }
  sockets[gR.ownerId].emit('getGameData',gameData);
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