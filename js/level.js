var levelz = [
  {
    name:'Level 1',
    field: [
      [10,11,11,11, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,11,11,11,11,11,11,11,12],
      [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12],
      [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12],
      [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12],
      [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12],
      [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12],      
      [10,13,13,13,13,13,13,13, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0,13,13,13,13,13]
    ]  }

];

function genPlayerList(level,w,h,spriteGroup) {
  player = {};
  var x0 = levelz[level].field[0];
  var x1 = levelz[level].field[levelz[level].field.length-1];
  var y0 = levelz[level].field.map(function(l){return l[0]});
  var y1 = levelz[level].field.map(function(l){return l[l.length-1]});

  makePlayer(x0,'x',w,h,0,spriteGroup);
  makePlayer(x1,'x',w,h,game.height,spriteGroup);
  makePlayer(y0,'y',w,h,0,spriteGroup);
  makePlayer(y1,'y',w,h,game.width,spriteGroup);
}

function maxNotNull(listof) {
  return Math.min.apply(null, listof.map(function(s){return (s!=0)? s: 100;}) );
}

function makePlayer(lineList,orient,w,h,m,spriteGroup) {
  var playerNo = maxNotNull(lineList);
  var owh = 32;
  var posMin = lineList.indexOf(0)*owh;
  var posMax = (lineList.lastIndexOf(0)*owh)-128+owh;
  
  var avr = ( ( posMax - posMin ) / 2 ) + posMin;
  var startX = 9;
  var startY = 9;
  if(orient==='x') {
    startX = avr;
    startY = m;
  } else {
    startX = m;
    startY = avr;
  }

  player[playerNo] = new playerObj(startX,startY,posMin,posMax,orient,playerNo-1,spriteGroup);
  game.physics.enable([ player[playerNo].sprite ], Phaser.Physics.ARCADE);
}

var playerObj = function(x,y,min,max,orient,playerNo,spriteGroup) {
  var that = this;
  this.x = x;
  this.y = y;
  this.startX = x;
  this.startY = y;
  this.minPos = min;
  this.maxPos = max;
  this.orient = orient;
  this.score = 0;
  this.socketId = 0;
  this.playerNo = playerNo+1;
  this.velocity = 0;
  this.sprite = game.add.sprite(x,y,'padel'+orient, playerNo, spriteGroup);

  this.setSocketId = function setSocketId(socketId) {
    this.socketId = socketId;
  };

  this.getSocketId = function getSocketId() {
    return this.socketId;
  }

  this.doMove = function doMove() {
    if(this.velocity!=0) {
      this.move(this.velocity);
    }
  }

  this.move = function move(val) {
    if(val<1) {
      if(this.orient==='y') {
        this.sprite.body.y -= 8;
        if(this.sprite.body.y<this.minPos) this.sprite.body.y = this.minPos;
      } else {
        this.sprite.body.x -= 8;
        if(this.sprite.body.x<this.minPos) this.sprite.body.x = this.minPos;
      }
    } else {
      if(this.orient==='y') {
        this.sprite.body.y += 8;
        if(this.sprite.body.y>this.maxPos) this.sprite.body.y = this.maxPos;
      } else {
        this.sprite.body.x += 8;
        if(this.sprite.body.x>this.maxPos) this.sprite.body.x = this.maxPos;
      }
    }
  };

}