var socket = io(window.location.origin);

socket.on('connect', function(id){
  console.log(id);
  socket.emit('iamaserver',{player:[],uui:423});
});

socket.on('doMove', function(data){
  if(!(data.player||false)) return;
  console.dir(data);
  var playerKeys = KM_P[data.player.number];
	if(data.state==='end') {
		keys[playerKeys[0]] = false;
		keys[playerKeys[1]] = false;
	} else if(data.state==='start') {
		if(data.move==='up') {
			keys[playerKeys[0]] = true;
			keys[playerKeys[1]] = false;
		} else if(data.move==='down') {
			keys[playerKeys[0]] = false;
			keys[playerKeys[1]] = true;
		}
	}
});

socket.on('newPlayer',function(newPlayer){
  console.dir(newPlayer);
});