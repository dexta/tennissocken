var socket = io('http://localhost:9423');

socket.on('connect', function(id){
  console.log(id);
});

socket.on('getGamedata', function(data){

  console.dir(data);
});