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
        if (y >= this.Y && y + bO.h <= this.Y + this.h) {
          // collides with right paddle
          bO.X = this.X - bO.width;
          bO.Y = Math.floor( (bO.Y - bO.diry) + (bO.diry*k) );
          bO.dirx *= -1;
        }
      }
    } else if(this.collSide==="right") {
      if (this.X + this.width >= bO.X) {
        var collisionDiff = (this.X + this.width) - bO.X;
        var k = collisionDiff/-bO.dirx;
        var y = bO.diry*k + (bO.Y - bO.diry);
        if (y >= this.y && y + bO.h <= this.y + this.h) {
          // collides with the left paddle
          bO.X = this.X + this.width;
          bO.Y = Math.floor( (bO.Y - bO.diry) + (bO.diry*k) );
          bO.dirx *= -1;
        }
      }
    } else if(this.collSide==="top") {
      
    } else if(this.collSide==="button") {
      
    }

  }

 }

canRect.prototype = new canObj();

temp = function() {
  if (bDir.x > 0) {
    if (pPos2.x <= ( bPos.x + bPos.w ) && pPos2.x > ( bPos.x - (bDir.x + bPos.w) ) 
      ) {
      var collisionDiff = bPos.x + (bPos.w - pPos2.x);
      var k = collisionDiff/bDir.x;
      var y = bDir.y*k + (bPos.y - bDir.y);
      if (y >= pPos2.y && y + bPos.h <= pPos2.y + pPos2.h) {
        // collides with right paddle
        bPos.x = pPos2.x - bPos.w;
        bPos.y = Math.floor( (bPos.y - bDir.y) + (bDir.y*k) );
        bDir.x *= -1;
      }
    }
    } else {
      if (pPos1.x + pPos1.w >= bPos.x) {
        var collisionDiff = (pPos1.x + pPos1.w) - bPos.x;
        var k = collisionDiff/-bDir.x;
        var y = bDir.y*k + (bPos.y - bDir.y);
        if (y >= pPos1.y && y + bPos.h <= pPos1.y + pPos1.h) {
          // collides with the left paddle
          bPos.x = pPos1.x + pPos1.w;
          bPos.y = Math.floor( (bPos.y - bDir.y) + (bDir.y*k) );
          bDir.x *= -1;
        }
      }
    }




}