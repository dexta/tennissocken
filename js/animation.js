var activeSide = -1;
function rotateTo(side) {
  var l = ["front","back","top","bottom","right","left"];
  var rto = (side+0===side)? l[side] : side;
  document.getElementById("cube").className = "show-"+rto;
  activeSide = side;
}

var timeoutID = 0;

function reL(c) {
  // c++;
  // c = Math.floor( Math.random()*l.length );
  c = Math.floor( Math.random()*4 );

  rotateTo(c);
  timeoutID = setTimeout( function(){ reL(c); },1234);
}

function toggleCube() {
  if(document.getElementById("overlay").className.indexOf("hidden")===-1) {
    document.getElementById("overlay").className = "hidden";  
  } else {
    document.getElementById("overlay").className = "container";
  }
  
}

basicAnim = function(varA) {
  var that = this;
  this.timeoutID=0;
  this.activeSide=-1;
  this.queue = [
    {text:"hello dExta",time:500},
    {text:"hello Player 1",time:300}
  ];
  this.cubeVisible = true;
  this.animRunning = false;
  this.allSides = ["front","back","top","bottom","right","left"];
}

cubeAnim = function(varA) {
  this.constructor(varA);
  var that = this;
  this.add = function add(toList) {
    this.queue.push(toList);
    if(!this.cubeVisible) {
      this.animRunning = true;
      this.next();
    }
  };

  this.next = function next() {
    if(this.queue.length===0) {
      if(this.cubeVisible) {
        this.toggleCube();
        this.animRunning = false;
      }
      return;
    }
    var job = this.queue.splice(0,1)[0];
    var nts = this.notSame();
    var e = document.getElementsByClassName(this.allSides[nts])[0];
    e.innerHTML = job.text;
    this.rotateTo(nts);
    this.timeoutID = setTimeout(function() { that.next();},(job.time+1100));
  };

  this.stopAnim = function stopAnim() {
    clearTimeout(this.timeoutID);
  }

  this.rotateTo = function rotateTo(side) {
    var rto = (side+0===side)? this.allSides[side] : side;
    document.getElementById("cube").className = "show-"+rto;
    this.activeSide = side;
  };


  this.toggleCube = function toggleCube() {
    if(document.getElementById("overlay").className.indexOf("hidden")===-1) {
      document.getElementById("overlay").className = "hidden";
      this.cubeVisible = false;
    } else {
      document.getElementById("overlay").className = "container";
      this.cubeVisible = true;
    }
  };

  this.notSame = function notSame() {
    var newNo = Math.floor( Math.random()*4);
    if(newNo!=this.activeSide) return newNo;
    return this.notSame();
  }

  this.testAnim = function testAnim() {
    this.queue = [
      {text:"hello dExta",time:500},
      {text:"hello Player 1",time:300},
      {text:"<br>4",time:50},
      {text:"<br>3",time:50},
      {text:"<br>2",time:50},
      {text:"<br>1",time:50},
      {text:"!!<br> GO<br> !!!1!!!",time:500},
      {text:"...<br>...<br>...",time:50}
    ];
    this.next();    
  }
  // end of cubeAnim
};

cubeAnim.prototype = new basicAnim();

var cAnim = new cubeAnim();

// cAnim.next();