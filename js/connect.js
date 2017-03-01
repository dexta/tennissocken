var socket = io('http://localhost:9423');

socket.on('connect', function(id){
  console.log(id);
  socket.emit('iamaserver',{player:[],uui:423});
});

socket.on('doMove', function(data){
	if(data==="down") {
		keyEvent({keyCode:83},'down');
		setTimeout(function(){
			keyEvent({keyCode:83},'up');
		},50);
	} else if(data==="up") {
		keyEvent({keyCode:87},'down');
		setTimeout(function(){
			keyEvent({keyCode:87},'up');
		},50);
	}
  console.dir(data);
});