var socket = io('http://localhost:9423');

socket.on('connect', function(id){
  socket.emit('iamaclient',{playerName:'dexta'});
});