//######################################################################
//#####################   Build My Own Objects   #######################
//######################################################################

canObj = function(ctx,X,Y) {
  this.onClick = false;
  this.onHover = false;
  this.hoverFac = 1.1;
  this.X = X;
  this.Y = Y;
  this.C = ctx;
  this.zFac = 1;
  }
// canObj.prototype.toggleClick = function(){ this.onClick = (this.onClick) ? false : true; }

canRect = function(ctx,X,Y,W,H,collSide) {
  this.constructor(ctx,X,Y);
  this.width = W;
  this.height = H;
  this.fillColor = "rgba(255,255,255,1)";
  this.borderColor = "rgba(255,255,255,1)";
  this.collSide = collSide||"left";

  this.draw = function() {
    this.C.beginPath();
    this.C.rect(this.X,this.Y,this.width,this.height);
    this.C.fillStyle = this.fillColor;
    this.C.fill();
    this.C.lineWidth = 0;
    this.C.strokeStyle = this.borderColor;
    this.C.stroke();
  };

  this.collision = function(bO) {
    // bO - ball Object get the x,y,w,h,dirx,diry etc
    if(this.collSide==="left") {
      if (this.X <= ( bO.X + bO.width ) && this.X > ( bO.X - (bO.dirx + bO.width) ) 
        ) {
        var collisionDiff = bO.X + (bO.width - this.X);
        var k = collisionDiff/bO.dirx;
        var y = bO.diry*k + (bO.Y - bO.diry);
        if (y >= this.Y && y + bO.height <= this.Y + this.height) {
          // collides with right paddle
          bO.X = this.X - bO.width;
          bO.Y = Math.floor( (bO.Y - bO.diry) + (bO.diry*k) );
          bO.dirx *= -1;
          return true;
        }
      }
      return false;
    } else if(this.collSide==="right") {
      if (this.X + this.width >= bO.X) {
        var collisionDiff = (this.X + this.width) - bO.X;
        var k = collisionDiff/-bO.dirx;
        var y = bO.diry*k + (bO.Y - bO.diry);
        if (y >= this.Y && y + bO.height <= this.Y + this.height) {
          // collides with the left paddle
          bO.X = this.X + this.width;
          bO.Y = Math.floor( (bO.Y - bO.diry) + (bO.diry*k) );
          bO.dirx *= -1;
          return true;
        }
      }
      return false;
    } else if(this.collSide==="top") {
      if(this.Y <= (bO.Y + bO.height) && this.Y > ( bO.Y - (bO.diry + bO.height) ) 
        ) {
        var collisionDiff = bO.Y + (bO.height - this.Y);
        var k = collisionDiff/bO.diry;
        var x = bO.dirx*k + (bO.X - bO.dirx);
        if(x >= this.X && x + bO.width <= this.X + this.width) {
          bO.Y = this.Y - bO.height;
          bO.X = Math.floor( (bO.X - bO.dirx) + (bO.dirx*k) );
          bO.diry *= -1;
          return true;
        }
      }
      return false;
    } else if(this.collSide==="bottom") {
      if(this.Y + this.height >= bO.Y) {
        var collisionDiff = (this.Y+this.height) - bO.Y;
        var k = collisionDiff/-bO.diry;
        var x = bO.dirx*k + (bO.X - bO.dirx);
        if( x >= this.X && x + bO.width <= this.X + this.width) {
          bO.Y = this.Y + this.height;
          bO.X = Math.floor( (bO.X - bO.dirx) + (bO.dirx*k) );
          bO.diry *= -1;
          return true;
        }
      }
      return false;
    }
  } // end collision
} // end canRect

canRect.prototype = new canObj();

canPlayer = function(ctx,conf) {
  // this.constructor(ctx,X,Y,W,H,collSide);
  for(var c in conf) {
    this[c] = conf[c];
  }
  this.rect = new canRect(ctx,this.X,this.Y,this.W,this.H,this.collSide);
  var colorZ = {red:'rgba(255,0,0,1)',blue:'rgba(0,0,255,1)',green:'rgba(0,255,0,1)',yellow:'rgba(255,255,0,1)'};
  this.rect.fillColor = colorZ[this.color];
  this.rect.borderColor = colorZ[this.color];
  this.draw = function() {
    this.rect.draw();
  }

  this.collision = function(bO) {
    var hit = this.rect.collision(bO);
    if(hit) {
      bO.setColor(this.rect.fillColor,this.rect.borderColor);
      var bFac = [];
      if(this.axis==='y') {
        bFac[0] = (bO.X-this.rect.X)-(this.rect.width/2);
        bFac[1] = (this.rect.width/2);
      }  else if(this.axis==='x') {
        bFac[0] = (bO.Y-this.rect.Y)-(this.rect.height/2);
        bFac[1] = (this.rect.height/2);
      }

      bFac[0] = (bFac[0]>=0)? bFac[0] : bFac[0]*-1;

      var rFac = 2-(((bFac[0]*100)/bFac[1])/100);
      // console.log("ball Factor "+rFac);
      bO.dirx = (bO.dirx>=0)? rFac*8 : (rFac*8)*-1;
      bO.diry = (bO.diry>=0)? rFac*6 : (rFac*6)*-1;
    }
  }

  // 
  this.move = function(val) {
    if(this.axis==='y') {
      this.rect.X += val;
      if(this.rect.X<this.minMovePos) {
        this.rect.X = this.minMovePos;
      } else if( (this.rect.X+this.rect.width)>this.maxMovePos ) {
        this.rect.X = this.maxMovePos-this.rect.width;
      }
    } else if(this.axis==='x') {
      this.rect.Y += val;
      if(this.rect.Y<this.minMovePos) {
        this.rect.Y = this.minMovePos;
      } else if( (this.rect.Y+this.rect.height)>this.maxMovePos ) {
        this.rect.Y = this.maxMovePos-this.rect.height;
      }
    } // end if axis
  }
} // end canPlayer

// canPlayer.prototype = new canRectBase();

// canBall(ctx,WIDTH/2,HEIGHT/2,10,10)
canBall = function(ctx,X,Y,W,H,dx,dy) {
  this.constructor(ctx,X,Y);
  this.width = W;
  this.height = H;
  this.dirx = dx;
  this.diry = dy;
  this.fillColor = "rgba(255,255,255,1)";
  this.borderColor = "rgba(255,255,255,1)";

  this.draw = function() {
    this.C.beginPath();
    this.C.rect(this.X,this.Y,this.width,this.height);
    this.C.fillStyle = this.fillColor;
    this.C.fill();
    this.C.lineWidth = 0;
    this.C.strokeStyle = this.borderColor;
    this.C.stroke();
  };  

  this.move = function() {
    this.X += this.dirx;
    this.Y += this.diry;
  };

  this.setColor = function(fill,border) {
    this.fillColor = fill;
    var bo = (border||false)? border : fill;
    this.borderColor = bo;
  }

};

canBall.prototype = new canObj();

function mergeObj(obj1,obj2) {
  var obj3 = {};
  for(var o1 in obj1) { obj3[o1] = obj1[o1]; }
  for(var o2 in obj2) { obj3[o2] = obj2[o2]; }
  return obj3;
}
