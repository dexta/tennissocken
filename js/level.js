var levelz = [
  {
    name:'Level 1',
    field: [
      [11,12,12,12,32,32,32,32,32,32, 2,32,32,32,32,32,32,32,12,12,12,12,12,12,13],
      [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,13],
      [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,13],
      [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,33],
      [31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,13],
      [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,13],
      [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,13],      
      [11,14,14,14,14,14,14,14,34,34,34, 4,34,34,34,34,34,34,34,34,14,14,14,14,13]
    ]  }

];

function mergeObj(obj1,obj2) {
  var obj3 = {};
  for(var o1 in obj1) {
    obj3[o1] = obj1[o1];
  }
  for(var o2 in obj2) {
    obj3[o2] = obj2[o2];
  }
  return obj3;
}

function buildChain(cX,cY,step,offset) {
  var nCh = (cX+0===cX)? cY : cX ;
  var nSo = (cY+0===cY)? cY : cX ;
  var fol = (cY+0===cY)? false : true;
  var nChain = [];
  for(var c in nCh) {
    if(nCh[c]>=10&&nCh[c]<=20) continue;
    var x = (fol)? nSo : c*step;
    var y = (!fol)? nSo : c*step;
    var ox = (!fol)? x : x+offset;
    var oy = (fol)? y : y+offset;
    nChain.push([[x,y],[ox,oy]]);
  }
  return nChain;
}

function genPlayerList(level,wh,spriteGroup,bricksGroup) {
  player = {};
  var opt = {};
  opt.spriteGroup = spriteGroup;
  opt.bricksGroup = bricksGroup;
  opt.widthHight = wh;

  var x0 = mergeObj(opt,{orient:'x',animDir:'-y',maxOut:0})

  x0.lineList = levelz[level].field[0];
  x0.blockList = buildChain(x0.lineList, x0.maxOut, wh, (wh*3)*-1);
  // x0.blockList = buildChain(x0.lineList, x0.maxOut, wh, wh*3);
  makePlayer(x0);  

  var x1 = mergeObj(opt,{orient:'x',animDir:'+y',maxOut:game.height});

  x1.lineList = levelz[level].field[levelz[level].field.length-1];
  x1.blockList = buildChain(x1.lineList, x1.maxOut-wh, wh, wh*3);
  
  makePlayer(x1);

  var y0 = mergeObj(opt,{orient:'y',animDir:'-x',maxOut:0});

  y0.lineList = levelz[level].field.map(function(l){return l[0]});
  y0.blockList = buildChain(y0.maxOut, y0.lineList, wh, (wh*3)*-1);

  makePlayer(y0);

  var y1 = mergeObj(opt,{orient:'y',animDir:'+x',maxOut:game.width});

  y1.lineList = levelz[level].field.map(function(l){return l[l.length-1]});
  y1.blockList = buildChain(y1.maxOut-wh, y1.lineList, wh, (wh*3));

  makePlayer(y1);  


  // makePlayer(x0,'x',w,h,0,spriteGroup);
  // makePlayer(x1,'x',w,h,game.height,spriteGroup);
  // makePlayer(y0,'y',w,h,0,spriteGroup);
  // makePlayer(y1,'y',w,h,game.width,spriteGroup);
}

function minNotNull(listof) {
  return Math.min.apply(null, listof.map(function(s){return (s!=0)? s: 100;}) );
}

function maxNotNull(listof) {
  return Math.max.apply(null, listof.map(function(s){return (s!=0)? s: 100;}) );
}
//lineList,orient,w,h,m,spriteGroup
function makePlayer(opt) {
  // var opt = {};
  // opt.orient = orient;
  // opt.spriteGroup = spriteGroup;
  opt.playerNo = minNotNull(opt.lineList);
  // opt.maxOut = m;
  // opt.widthHight = 32;
  var fillGap = maxNotNull(opt.lineList);
  opt.posMin = opt.lineList.indexOf(fillGap)*opt.widthHight;
  opt.posMax = (opt.lineList.lastIndexOf(fillGap)*opt.widthHight)-128+opt.widthHight;
  opt.countBricks = ( ( ((opt.lineList.lastIndexOf(fillGap)*opt.widthHight)-opt.posMin) / opt.widthHight)+1 );

  var avr = ( ( opt.posMax - opt.posMin ) / 2 ) + opt.posMin;
  
  if(opt.orient==='x') {
    opt.startX = avr;
    opt.startY = opt.maxOut;
  } else {
    opt.startX = opt.maxOut;
    opt.startY = avr;
  }
  // startX,startY,posMin,posMax,orient,playerNo-1,spriteGroup,
  player[opt.playerNo] = new playerObj(opt);
  game.physics.enable([ player[opt.playerNo].sprite ], Phaser.Physics.ARCADE);
  player[opt.playerNo].sprite.visible = false;
  player[opt.playerNo].sprite.orient = opt.orient;
}
//x,y,min,max,orient,playerNo,spriteGroup,
var playerObj = function(opt) {
  var that = this;
  this.x = opt.startX;
  this.y = opt.startY;
  this.sprite = game.add.sprite(opt.startX,opt.startY,'padel'+opt.orient, opt.playerNo-1, opt.spriteGroup);
  this.blockWall = [];
  for(var b in opt.blockList) {
    var e = opt.blockList[b][0];
    this.blockWall[b] = game.add.sprite(e[0],e[1],'bricks',opt.playerNo-1, opt.bricksGroup);
  }
  for(var o in opt) {
    this[o] = opt[o];
  }
  // this.startX = x;
  // this.startY = y;
  // this.minPos = min;
  // this.maxPos = max;
  // this.orient = orient;

  this.score = 0;
  this.socketId = 0;
  this.velocity = 0;
  
  
  this.closePos = [];
  this.openPos = [];
  this.connected = false;
  this.animRun = false;
  this.animCount = 0;
  this.animType = true;

  this.setSocketId = function setSocketId(socketId) {
    this.socketId = socketId;
  };

  this.getSocketId = function getSocketId() {
    return this.socketId;
  };

  this.doMove = function doMove() {
    if(this.velocity!=0) {
      this.move(this.velocity);
    }
  };

  this.setToStartPos = function setToStartPos() {
    this.sprite.body.x = this.startX;
    this.sprite.body.y = this.startY;
  }

  this.anim = function anim() {
    if(this.animCount>100 && this.animType) {
      this.animRun = false;
      // this.sprite.visible = true;
    } else if(this.animCount<-1 && !this.animType) {
      this.animRun = false;
      // this.sprite.visible = false;
    }
    if(this.animRun&&( (this.animType&&this.animCount>32&&this.animCount<64)||(!this.animType&&this.animCount<32) ) ) {
      this.setToStartPos();
      this.sprite.visible = this.animType;
    }
    this.animCount += (this.animType)? 1 : -1;
    // var activeBricks = 0;
    // var bricks = playerBricks[this.playerNo]
    var bricks = this.blockWall;
    var stepBrick = (100/bricks.length);
    var endBrick = Math.floor( (this.animCount/stepBrick) );

    var tyFa = (this.animType)? -1 : +1;
    var diFa = (this.animDir.indexOf('+')!=-1)? tyFa : tyFa*-1;
    for(var b in this.blockWall) {
      var goTo = (this.animType)? this.blockList[b][1] : this.blockList[b][0];
      if(this.blockWall[b].body.x!=goTo[0]) {
        if(this.blockWall[b].body.x>goTo[0]) {
          this.blockWall[b].body.x--;
        } else {
          this.blockWall[b].body.x++;
        }
        
      }
      if(this.blockWall[b].body.y!=goTo[1]) {
        if(this.blockWall[b].body.y>goTo[1]) {
          this.blockWall[b].body.y--;
        } else {
          this.blockWall[b].body.y++;
        }
      }

      // if(b>endBrick) break;
      // if(this.animDir.indexOf("x")!=-1) {
      //   var fa = (this.animDir.indexOf("+")!=-1)? 1 : -1;
      //   // bricks[b].body.x += (this.animType)? fa : fa*-1;
      //   this.blockWall[b].body.x += (this.animType)? fa : fa*-1;
      // } else if(this.animDir.indexOf("y")!=-1) {
      //   var fa = (this.animDir.indexOf("+")!=-1)? 1 : -1;
      //   // bricks[b].body.y += (this.animType)? fa : fa*-1;
      //   this.blockWall[b].body.y += (this.animType)? fa : fa*-1;
      // }
    }
  };

  this.createAnim = function createAnim() {

  };

  this.move = function move(val) {
    if(val<1) {
      if(this.orient==='y') {
        this.sprite.body.y -= 8;
        if(this.sprite.body.y<this.posMin) this.sprite.body.y = this.posMin;
      } else {
        this.sprite.body.x -= 8;
        if(this.sprite.body.x<this.posMin) this.sprite.body.x = this.posMin;
      }
    } else {
      if(this.orient==='y') {
        this.sprite.body.y += 8;
        if(this.sprite.body.y>this.posMax) this.sprite.body.y = this.posMax;
      } else {
        this.sprite.body.x += 8;
        if(this.sprite.body.x>this.posMax) this.sprite.body.x = this.posMax;
      }
    }
  };

}

function debugPB() {
  var co = "";
  var pbn = 1;
  for(var p in playerBricks[pbn]) {
    co += "| "+playerBricks[pbn][p].body.x+"x"+playerBricks[pbn][p].body.y+" ";
  }
  console.log(co);
}