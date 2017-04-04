
var game = new Phaser.Game(800, 608, Phaser.CANVAS, 'puckDiv', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.stage.disableVisibilityChange = true;

  game.load.spritesheet('bricks', 'img/Bricks_32x32.png',32,32);
  game.load.spritesheet('balls','img/Ball_32x32.png',32,32);
  game.load.spritesheet('padelx','img/Padel_128x32.png',128,32);
  game.load.spritesheet('padely','img/Padel_32x128.png',32,128);

}

var ball;
var panel;
var player = {};
var playerBricks = {1:[],2:[],3:[],4:[]};
var keys = {};

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  ball = game.add.sprite(400, 304, 'balls',2);

  this.bricks = game.add.group();
  this.bricks.enableBody = true;

  this.padels = game.add.group();
  this.padels.enableBody = true;


  this.level = levelz[0];
  
  var yl = this.level.field.length;
  var xl = this.level.field[0].length;

  genPlayerList(0,32,this.padels,this.bricks);

  for(var y=0;y<yl;y++) {
    for(var x=0;x<xl;x++) {
      var brickTypeNo = this.level.field[y][x];
      if(brickTypeNo===0) {
        continue;
      } else if(brickTypeNo>10&&brickTypeNo<19) {
        game.add.sprite((x*32), (y*32), 'bricks', brickTypeNo-11, this.bricks);
      } else if(brickTypeNo<5||brickTypeNo>19) {
        var bN = (brickTypeNo<5)? brickTypeNo-1 : brickTypeNo-31;
        var pl = bN+1;
        // var tb = game.add.sprite((x*32), (y*32), 'bricks', bN, this.bricks);
        if(pl>4) {
          console.log("stop");
        }
        // playerBricks[pl].push(tb);
      }
    }
  }
  
  game.physics.enable([ ball ,this.bricks, this.padels ], Phaser.Physics.ARCADE);

  this.bricks.setAll('body.immovable', true);
  // this.bricks.setAll('body.collideWorldBounds', true);
  
  this.padels.setAll('body.immovable', true);
  this.padels.setAll('body.collideWorldBounds', true);
  this.padels.setAll('body.bounce.set', 1);

  // ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.body.allowGravity = false;

  ball.body.velocity.x=350;
  ball.body.velocity.y=345;

  keys = game.input.keyboard.createCursorKeys();
  keys.W = game.input.keyboard.addKey(Phaser.Keyboard.W);
  keys.S = game.input.keyboard.addKey(Phaser.Keyboard.S);
  keys.A = game.input.keyboard.addKey(Phaser.Keyboard.A);
  keys.D = game.input.keyboard.addKey(Phaser.Keyboard.D);

  game.paused = true;
}
var doubleCollide = false;
function update () {
  doubleCollide = false;
  game.physics.arcade.collide(ball,this.bricks,avoidDoubleCollide);
  game.physics.arcade.collide(ball,this.padels,collidePanelBall);
  for(var n=1;n<=4;n++) {
    player[n].doMove();
  }
  if(keys.up.isDown) {
    player[1].move(-8);
  } else if(keys.down.isDown) {
    player[1].move(8);
  }

  if(keys.left.isDown) {
    player[3].move(-8);
  } else if(keys.right.isDown) {
    player[3].move(8);
  }
  
  if(keys.W.isDown) {
    player[2].move(-8);
  } else if(keys.S.isDown) {
    player[2].move(8);
  }

  if(keys.A.isDown) {
    player[4].move(-8);
  } else if(keys.D.isDown) {
    player[4].move(8);
  }

  if(!ball.inCamera) {
    // console.log("player plus one "+ball.frame);
    var playerNo = ball.frame+1;
    ball.body.x = game.width/2;
    ball.body.y = game.height/2;
    ball.body.velocity.x *= -1;
    ball.body.velocity.y *= -1;
    document.getElementById("player"+(ball.frame+1)+"Score").innerHTML = player[playerNo].score++;
  }

  for(var p in player) {
    if(player[p].animRun) {
      // player[p].sprite.visible = true;
      if (!player[p].animEnd) player[p].anim();
    } 
  }

}

function render () {
  // game.debug.spriteInfo(player[3].sprite, 42, 64);
}

function avoidDoubleCollide() {
  if(doubleCollide) return 0;
  doubleCollide = true;
  return 1;
}

function collidePanelBall(b,p) {
  // if(p.visible === false) return 0;
  if(p.orient==="y" && (p.body.touching.up||p.body.touching.down)) {
    return 0;
  } else if(p.orient==="x" && (p.body.touching.left||p.body.touching.right)) {
    return 0;
  }
  b.frame = p.frame;
  return 1;
}