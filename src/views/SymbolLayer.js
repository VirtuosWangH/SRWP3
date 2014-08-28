/**
 * Created by wanghe on 2014/8/13.
 */
var SymbolLayer = cc.Layer.extend({
    curScene:null,
    columnGap:23,
    symbolGap:5,
    columnWidth:142,
    symbolHeight:116,
    reelNum:5,
    symbolNum:6,

    symbolResult:[[1,2,3,4,5],
                  [5,4,3,2,1],
                  [7,7,7,7,7],
                  [1,2,3,4,5]],
    symbolGrad:null,
    /*
    * [
    * [{0,605}]
    * [{0,484}]
    * [{0,363}]
    * [{0,242}]
    * [{0,121}]
    * [{0,0}  ][165,0][330-0][495-0][660-0]
    * [{0,-121}  ]
    * ]
    * */
    rollDown:false,
    rollStoped:true,
    ctor:function(){
        this._super();
    },
    init:function () {
        var bRet = false;
        this.setPosition(185,205);
        if (this._super()) {

            cc.spriteFrameCache.addSpriteFrames(res.textureAssets01_plist);

            this.screenRect = cc.rect(0, 0,100, 200);

//            var symbolVO = new SymbolVO();
//            symbolVO.showString();

            this.symbolGrad = [];
            this.initSymbol();

            bRet = true;
        }
//        this.startRoll();
        return bRet;
    },
    initSymbol:function(){
        for (var i = 0; i<this.reelNum; i++) {
            var symbolReel = [];
            for (var j = 0; j<this.symbolNum; j++) {
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(this.getRandonSymbolName());
                var symbol = cc.Sprite.createWithSpriteFrame(spriteFrame);
                var offsetX = this.columnWidth+this.columnGap;
                var offsetY = this.symbolHeight+this.symbolGap;
                symbol.setPosition(offsetX*i,offsetY*j);
                this.addChild(symbol);
                symbolReel.push(symbol);
            }
            this.symbolGrad.push(symbolReel);
        }
    },
    getRandonSymbolName:function(){
        var tempNum = Math.ceil(Math.random()*12);
        var num = tempNum>9?tempNum:"0"+tempNum;
        var symbolName = "Symbol_"+num+".png";
        return symbolName;
    },
    startRoll:function(){
        if(this.rollStoped){
            this.rollStoped = false;
            this.rollDown = false;
            for (var i = 0; i<this.reelNum; i++) {
                for (var j = 0; j < this.symbolNum; j++) {
                    var moveAnim = cc.MoveBy.create(0.6, cc.p(0, -121));
                    var easeMove = cc.EaseBackIn.create(moveAnim);
                    var onComplete = cc.CallFunc.create(this.smoothRoll,this,cc.p(i,j));
                    var delay = cc.DelayTime.create(0.3*i);
                    var tempSymbol = this.symbolGrad[i][j];
                    tempSymbol.runAction(cc.Sequence.create(delay,easeMove, onComplete));
                }
            }
        }
    },
    smoothRoll:function(e,point){
        var moveAnim = cc.MoveBy.create(0.1, cc.p(0, -121));
        var repeat = cc.Repeat.create(moveAnim,6*2);
        var onComplete = cc.CallFunc.create(this.finishRoll,this,point);
        var tempSymbol = this.symbolGrad[point.x][point.y];
        tempSymbol.runAction(cc.Sequence.create(repeat, onComplete));

        if(point.x == 0 && point.y == 0){
            this.scheduleUpdate();
        }
    },
    finishRoll:function(e,point){
        this.rollDown = true;

        var moveAnim = cc.MoveBy.create(0.1, cc.p(0, -121));
        var repeat = cc.Repeat.create(moveAnim,6);
        var onComplete = cc.CallFunc.create(this.positionWell,this,point);
        var tempSymbol = this.symbolGrad[point.x][point.y];
        tempSymbol.runAction(cc.Sequence.create(repeat,onComplete));
    },
    positionWell:function(e,point){
        var moveAnim = cc.MoveTo.create(0.3, cc.p(point.x*165, point.y*121));
        var easeMove = cc.EaseBackOut.create(moveAnim);
        var onComplete = cc.CallFunc.create(this.showWin,this,point);
        var tempSymbol = this.symbolGrad[point.x][point.y];
        tempSymbol.runAction(cc.Sequence.create(easeMove, onComplete));
    },
    showWin:function(e,point){
//        cc.log(point.x,point.y);
        if(point.x == 4 && point.y == 5){
            this.rollStoped = true;
            var isWinningSpin = true;
            if(isWinningSpin){
                this.setVisible(false)
                this.curScene.showWins(true);
            }
        }
    },
//--------scheduleUpdate------------------------------------------
    update:function (dt) {
        for (var i = 0; i<this.reelNum; i++) {//column
            for (var j = 0; j<this.symbolNum; j++) {//row
                var tempSymbol = this.symbolGrad[i][j];
                var currentY = tempSymbol.getPositionY();
                if(currentY<=-121){
                    var offset = Math.abs(currentY)-121;
                    tempSymbol.setPositionY(605 - offset);
                      if(this.rollDown){
                          if(i<5 && j<4){
                              var index = this.symbolResult[j][i];
                              var frame = cc.spriteFrameCache.getSpriteFrame("Symbol_0"+index+".png");
//                              tempSymbol.setDisplayFrame(frame);
                              tempSymbol.setSpriteFrame(frame);
                          }
                      }else{
                          var frame = cc.spriteFrameCache.getSpriteFrame(this.getRandonSymbolName());
//                          tempSymbol.setDisplayFrame(frame);
                          tempSymbol.setSpriteFrame(frame);
                      }
                }
            }
        }
//        this.movingSymbol(dt);
    }
//    movingSymbol:function(dt){
//        var movingDist = 500 * dt;       // Symbol's moving rate is 16 pixel per second
//        for (var i = 0; i<this.reelNum; i++) {
//            for (var j = 0; j<this.symbolNum; j++) {
//                var tempSymbol = this.symbolGrad[i][j];
//                var currPosY = tempSymbol.getPositionY() - movingDist;
//                if(currPosY <= 100){
//                    tempSymbol.setPositionY(205+(this.symbolHeight+this.symbolGap)*5);
//                } else{
//                    tempSymbol.setPositionY(currPosY);
//                }
//            }
//        }
//    }
//---------------------------------------------------------------
});

SymbolLayer.create = function () {
    var sg = new SymbolLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};