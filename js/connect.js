var socket = io(window.location.origin);

socket.on('connect', function(id){
  console.log(id);
  socket.emit('iamaserver',{player:[],uui:423});
});

socket.on('doMove', function(data){
	if(data.move==="down") {
		keyEvent({keyCode:83},'down');
		keyEvent({keyCode:87},'up');
	} else if(data.move==="up") {
		keyEvent({keyCode:83},'up');
		keyEvent({keyCode:87},'down');
	} else if(data.state==='end') {
		keyEvent({keyCode:83},'up');
		keyEvent({keyCode:87},'up');
	}
  // console.dir(data);
});

socket.on('newPlayer',function(newPlayer){
  console.dir(newPlayer);
});