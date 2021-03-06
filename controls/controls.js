var socket = io(window.location.origin);
var axisConfig = 'x';
var lastXY = [false,false];
console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
socket.on('connect',function(){
  socket.emit('iamaclient',{});
});
socket.on('welcomePlayer',function(playerData){
  console.log('welcome Player - id: '+playerData.socketId);
  console.dir(playerData);
});

socket.on('playerSettingsToClient',function(settings){
  console.log('server send settings: ');
  console.dir(settings);
  axisConfig = settings.axis;
  document.body.style.background = settings.color;
  // var svgURL = (settings.number===1)? 'svg/PlayerOne.svg' : 'svg/PlayerTwo.svg';
  // document.getElementById('container').style.background = 'url('+svgURL+')';
});

socket.on('serverGone',function(){
  console.log("server is gone");
  socket.emit('iamaclient',{});
});

var joyStart = false;
var joystick  = new VirtualJoystick({
  container : document.getElementById('container'),
  mouseSupport  : true,
  limitStickTravel: true,
  stickRadius : 50
});
joystick.addEventListener('touchStart', function(){
  joyState('start');
})
joystick.addEventListener('touchEnd', function(){
  joyState('end');
})
joystick.addEventListener('mouseStart', function(){
  joyState('start');
})
joystick.addEventListener('mouseEnd', function(){
  joyState('end');
})
setInterval(function(){
  if(joyStart===false) return;
  var outputEl  = document.getElementById('result');
  var PUP = false;
  var PDOWN = false;
  if(axisConfig==='y' && joystick.up()) {
    PDOWN = true;
  } else if(axisConfig==='y' && joystick.down()) {
    PUP = true;
  } else if(axisConfig==='x' && joystick.left()) {
    PDOWN = true;
  } else if(axisConfig==='x' && joystick.right()) {
    PUP = true;
  }
  if(lastXY[0]===PUP && lastXY[1]===PDOWN) return;
  lastXY[0]=PUP;
  lastXY[1]=PDOWN;
  if(PUP) {
    socket.emit('joystick',{move:'up',state:'start'});
    outputEl.innerHTML = 'send Down';
  } else if (PDOWN) {
    socket.emit('joystick',{move:'down',state:'start'});
    outputEl.innerHTML = 'send Up';
  }
}, 1/30 * 1000);

function joyState(event) {
  if(event==='start') {
    joyStart = true;
  } else if(event==='end') {
    joyStart = false;
    socket.emit('joystick',{move:'',state:'end'});
  }
}