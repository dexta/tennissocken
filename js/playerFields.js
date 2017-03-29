var muteWalls = [];

function restField() {
  canObjs = {
    player: [],
    balls: [],
    field: []
  };
  muteWalls = { 
    // the mass must have a end
    // from now we using a physic engine as external lib
    // this one is over the way broken in multi way
    // no overlay object - fly throw object - stuck in corner etc.
    // start seeking commit
    top: new canRect(ctx,0,0,WIDTH,10,'bottom'),
    right: new canRect(ctx,WIDTH-10,0,10,HEIGHT,'left'),
    bottom: new canRect(ctx,0,HEIGHT-10,WIDTH,10,'top'),
    left: new canRect(ctx,0,0,10,HEIGHT,'right')
  };
}

function initPlayerZerro() {
  restField();
  canObjs.field = [
    new canRect(ctx,0,0,WIDTH,10,'bottom'),
    new canRect(ctx,WIDTH-10,0,10,HEIGHT,'left'),
    new canRect(ctx,0,HEIGHT-10,WIDTH,10,'top'),
    new canRect(ctx,0,0,10,HEIGHT,'right')
  ];

  canObjs.balls = [
    new canBall(ctx,(WIDTH/2),(HEIGHT/2),10,10,-14,-8)
  ];
}

function initPlayerOne(playerConfig) {
  restField();
  howManyPlayer = 0;
  canObjs.field = [
    new canRect(ctx,0,0,WIDTH,10,'bottom'),
    new canRect(ctx,WIDTH-10,0,10,HEIGHT,'left'),
    new canRect(ctx,0,HEIGHT-10,WIDTH,10,'top')
  ];

  canObjs.balls = [
    new canBall(ctx,(WIDTH/2),(HEIGHT/2),10,10,-6,-4)
  ];

  var cusUpd = {color:playerConfig[0].color,minMovePos:10,maxMovePos:HEIGHT-10};

  canObjs.player = [
    new canPlayer(ctx,defaultConfig('xAxisPlayer',cusUpd))
  ];
  $("#playerOne").css("background-color",canObjs.player[0].rect.fillColor);
}

function initPlayerOne(playerConfig) {
  restField();
  howManyPlayer = 1;
  canObjs.field = [
    new canRect(ctx,0,0,WIDTH,10,'bottom'),
    new canRect(ctx,WIDTH-10,0,10,HEIGHT,'left'),
    new canRect(ctx,0,HEIGHT-10,WIDTH,10,'top')
  ];

  canObjs.balls = [
    new canBall(ctx,(WIDTH/2),(HEIGHT/2),10,10,-6,-4)
  ];

  var cusUpd = {collSide:'right',color:playerConfig[0].color,minMovePos:10,maxMovePos:HEIGHT-10};

  canObjs.player = [
    new canPlayer(ctx,defaultConfig('xAxisPlayer',cusUpd))
  ];
  $("#playerOne").css("background-color",canObjs.player[0].rect.fillColor);
}

function initPlayerTwo(playerConfig) {
  restField();
  howManyPlayer = 2;
  canObjs.field = [
    new canRect(ctx,0,0,WIDTH,10,'bottom'),
    // new canRect(ctx,WIDTH-10,0,10,HEIGHT,'left'),
    new canRect(ctx,0,HEIGHT-10,WIDTH,10,'top')
  ];

  canObjs.balls = [
    new canBall(ctx,(WIDTH/2),(HEIGHT/2),10,10,-6,-4)
  ];

  var cusUpd = {collSide:'right',color:playerConfig[0].color,minMovePos:10,maxMovePos:HEIGHT-10};
  var cusUpd1 = {X:(WIDTH-20),collSide:'left',color:playerConfig[1].color,minMovePos:10,maxMovePos:HEIGHT-10};

  canObjs.player = [
    new canPlayer(ctx,defaultConfig('xAxisPlayer',cusUpd)),
    new canPlayer(ctx,defaultConfig('xAxisPlayer',cusUpd1))
  ];

  $("#playerOne").css("background-color",canObjs.player[0].rect.fillColor);
  $("#playerTwo").css("background-color",canObjs.player[1].rect.fillColor);

}

function initPlayerThree(playerConfig) {
  restField();
  howManyPlayer = 3;
  var oneThird = ((WIDTH-HEIGHT)/2)*0.95;
  canObjs.field = [
    new canRect(ctx,0,0,oneThird,10,'bottom'),
    new canRect(ctx,WIDTH-oneThird,0,oneThird,10,'bottom'),
    // new canRect(ctx,WIDTH-10,0,10,HEIGHT,'left'),
    new canRect(ctx,0,HEIGHT-10,WIDTH,10,'top')
  ];

  canObjs.balls = [
    new canBall(ctx,(WIDTH/2),(HEIGHT/2),10,10,-6,-4)
  ];

  var cusUpd = {collSide:'right',color:playerConfig[0].color,minMovePos:10,maxMovePos:HEIGHT-10};
  var cusUpd1 = {X:(WIDTH-20),collSide:'left',color:playerConfig[1].color,minMovePos:10,maxMovePos:HEIGHT-10};
  var cusUpd2 = {X:oneThird,Y:10,collSide:'bottom',color:playerConfig[2].color,minMovePos:oneThird,maxMovePos:WIDTH-oneThird-90};

  canObjs.player = [
    new canPlayer(ctx,defaultConfig('xAxisPlayer',cusUpd)),
    new canPlayer(ctx,defaultConfig('xAxisPlayer',cusUpd1)),
    new canPlayer(ctx,defaultConfig('yAxisPlayer',cusUpd2))
  ];

  $("#playerOne").css("background-color",canObjs.player[0].rect.fillColor);
  $("#playerTwo").css("background-color",canObjs.player[1].rect.fillColor);
  $("#playerThree").css("background-color",canObjs.player[2].rect.fillColor);

}

function initPlayerFour(playerConfig) {
  restField();
  howManyPlayer = 4;
  var oneThird = ((WIDTH-HEIGHT)/2)*0.95;
  canObjs.field = [
    new canRect(ctx,0,0,oneThird,10,'bottom'),
    new canRect(ctx,WIDTH-oneThird,0,oneThird,10,'bottom'),
    // new canRect(ctx,WIDTH-10,0,10,HEIGHT,'left'),
    new canRect(ctx,0,HEIGHT-10,oneThird,10,'top'),
    new canRect(ctx,WIDTH-oneThird,HEIGHT-10,oneThird,10,'top')
  ];

  canObjs.balls = [
    new canBall(ctx,(WIDTH/2),(HEIGHT/2),10,10,-6,-4),
    new canBall(ctx,(WIDTH/2),(HEIGHT/2),10,10,6,4)
  ];
  var mute1 = new canRect(ctx,11,0,10,HEIGHT-22,'right');
  var cusUpd = {  Y:50,X:300,collSide:'right',color:playerConfig[0].color,
                  minMovePos:10,maxMovePos:HEIGHT-10,muteWall:mute1  };

  var mute2 = new canRect(ctx,11,WIDTH-10,10,HEIGHT-22,'left'); 
  var cusUpd1 = { Y:50,X:(WIDTH-300),collSide:'left',color:playerConfig[1].color,
                  minMovePos:10,maxMovePos:HEIGHT-10,muteWall:mute2  };

  var mute3 = new canRect(ctx,oneThird+4,0,oneThird,10,'bottom');
  var cusUpd2 = { X:oneThird+50,Y:0,collSide:'bottom',color:playerConfig[2].color,
                  minMovePos:oneThird,maxMovePos:WIDTH-oneThird,muteWall:mute3   };

  var mute4 = new canRect(ctx,oneThird+4,HEIGHT-10,WIDTH-oneThird-5,10,'top');          
  var cusUpd3 = { X:oneThird+50,Y:HEIGHT-10,collSide:'top',color:playerConfig[3].color,
                  minMovePos:oneThird,maxMovePos:WIDTH-oneThird,muteWall:mute4   };

  canObjs.player = [
    new canPlayer(ctx,defaultConfig('xAxisPlayer',cusUpd)),
    new canPlayer(ctx,defaultConfig('xAxisPlayer',cusUpd1)),
    new canPlayer(ctx,defaultConfig('yAxisPlayer',cusUpd2)),
    new canPlayer(ctx,defaultConfig('yAxisPlayer',cusUpd3))
  ];

  $("#playerOne").css("background-color",canObjs.player[0].rect.fillColor);
  $("#playerTwo").css("background-color",canObjs.player[1].rect.fillColor);
  $("#playerThree").css("background-color",canObjs.player[2].rect.fillColor);
  $("#playerFour").css("background-color",canObjs.player[3].rect.fillColor);

}

function defaultConfig(name,update) {
  if(name==="xAxisPlayer") {
    var xap = {X:10,Y:(HEIGHT/2)-50,W:10,H:450,collSide:'left',color:'red',axis:"x",minMovePos:0,maxMovePos:2342};
    return mergeObj(xap,update);
  } else if(name==="yAxisPlayer") {
    var yap = {X:(WIDTH/2)-50,Y:10,W:500,H:10,collSide:'top',color:'yellow',axis:"y",minMovePos:0,maxMovePos:2342};
    return mergeObj(yap,update);
  }
}

function testPlayfield(no) {
  no = (no||false)? no : 0;
  if(no===0) {
    initPlayerZerro();
  } else if(no===1) {
    initPlayerOne([{color:'blue'}]);
  } else if(no===2) {
    initPlayerTwo([{color:'blue'},{color:'yellow'}]);
  } else if(no===3) {
    initPlayerThree([{color:'blue'},{color:'yellow'},{color:'green'}]);
  } else if(no===4) {
    initPlayerFour([{color:'blue'},{color:'yellow'},{color:'green'},{color:'red'}]);
  } else {
    console.log("no number here in testPlayfield "+no);
  }
  
}
