/**
 * Created by wanghe on 2014/8/20.
 */
var symbolResults = [
    [[1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [7,7,7,7,7],
    [1,2,3,4,5],
    [1,2,3,4,5]],

    [[1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [8,8,8,8,8],
    [1,2,3,4,5],
    [1,2,3,4,5]],

    [[1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [9,9,9,9,1],
    [1,2,3,4,5],
    [1,2,3,4,5]],

    [[1,2,3,4,5],
    [1,2,3,4,5],
    [5,4,3,2,1],
    [5,4,3,2,1],
    [1,2,3,4,5],
    [1,2,3,4,5]],

    [[1,2,3,4,5],
    [1,2,3,4,5],
    [7,8,3,2,1],
    [5,4,9,2,1],
    [1,2,3,6,5],
    [1,2,3,4,5]],

    [[1,2,3,4,5],
    [1,2,3,4,5],
    [5,8,3,2,7],
    [5,4,6,2,1],
    [6,2,3,6,5],
    [1,2,3,4,5]],

    [[1,2,3,4,5],
    [1,2,3,4,7],
    [9,7,3,2,1],
    [6,4,9,2,1],
    [1,2,3,6,5],
    [1,2,3,4,5]]
]

var SymbolNewLayer = cc.Layer.extend({
    curScene: null,
    columnGap:23,
    symbolGap:5,
    columnWidth:142,
    symbolHeight:116,
    reelNum:5,
    symbolNum:6,
    defaultSpeed:2,
    speedAry:[0,0,0,0,0],
    maxSpeed:-20,
    defaultVelocity:-0.2,
    velocityAry:[0,0,0,0,0],
    reelSpriteAry:null,
    symbolGrad:null,
    blurSymbolGrad:null,
    moveReelSpriteFlag:true,
    rollStopedFlag:true,
    stopRollFlag:false,

    ctor:function(){
        this._super();
//        this.setTag("newSymbolLayer");
        this.tagName = "test";
        cc.spriteFrameCache.addSpriteFrames(res.textureAssets01_plist);
        this.setPosition(185,205);
    },
    init:function () {
        cc.log("init is not invoke except using cc.layer.create()");
    },
    onEnter:function(){
        this._super();
        this.reelSpriteAry = [];
        this.symbolGrad = [];
        this.initSymbolReel();

        this.blurSymbolGrad = [];
        this.initBlurSymbol();
    },
    initSymbolReel:function(){
        for (var i = 0; i<this.reelNum; i++) {
            var reelSprite = new cc.Sprite();
            var symbolReel = [];
            for (var j = 0; j<this.symbolNum; j++) {
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(this.getRandonSymbolName());
                var symbol = cc.Sprite.createWithSpriteFrame(spriteFrame);
                var offsetY = this.symbolHeight+this.symbolGap;
                symbol.y = offsetY*(j-1);
                reelSprite.addChild(symbol);
                symbolReel.push(symbol);
            }
            var offsetX = this.columnWidth+this.columnGap;
            reelSprite.x = offsetX*i;
            this.addChild(reelSprite);
            this.reelSpriteAry.push(reelSprite);
            this.symbolGrad.push(symbolReel)
        }
    },
    initBlurSymbol:function(){
        for (var i = 0; i<this.reelNum; i++) {
            var symbolReel = [];
            for (var j = 0; j<this.symbolNum; j++) {
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(this.getBlurRandonSymbolName());
                var symbol = cc.Sprite.createWithSpriteFrame(spriteFrame);
                var offsetX = this.columnWidth+this.columnGap;
                var offsetY = this.symbolHeight+this.symbolGap;
                symbol.setPosition(offsetX*i,offsetY*(j+this.symbolNum-1));
                symbol.reelIndex = i;
                symbol.symbolIndex = j;
                symbol.isRolling = true;
                this.addChild(symbol);
                symbolReel.push(symbol);
            }
            this.blurSymbolGrad.push(symbolReel);
        }
    },
    startRoll:function(){
        if(this.rollStopedFlag){
            this.speedAry = [this.defaultSpeed,this.defaultSpeed,this.defaultSpeed,this.defaultSpeed,this.defaultSpeed];
            this.rollStopedFlag = false;
            this.delayIndex = 0;
            this.schedule(this.delayRollingSetting,0.2,4,0.1);
            this.scheduleUpdate();
            var onComplete = cc.callFunc(this.stopRoll,this);
            var delay = cc.delayTime(3);
            this.runAction(cc.sequence(delay,onComplete));
        }
    },
    stopSymbolIndex:-1,
    update:function (dt) {
        var tempBlurSymbol;
        for (var i = 0; i<this.reelNum; i++) {
            var reelSprite =  this.reelSpriteAry[i];
            this.speedAry[i] += this.velocityAry[i];
            if(this.speedAry[i]<this.maxSpeed){
                this.speedAry[i] = this.maxSpeed;
            }
            if(this.moveReelSpriteFlag){
                if(reelSprite.y<=-121*6){
                    reelSprite.y += 0;
                    if(i == this.reelNum-1){
                        this.prepareResult();
                    }
                }else{
                    reelSprite.y += this.speedAry[i];
                }
            }
            //blur symbol move
            for (var j = 0; j < this.symbolNum; j++) {
                tempBlurSymbol = this.blurSymbolGrad[i][j];
                var currentY = tempBlurSymbol.getPositionY();
                if(currentY<=-121) {
                    var offset = Math.abs(currentY) - 121;
                    if(this.stopRollFlag){
                        if(this.stopSymbolIndex<0){
                            this.stopSymbolIndex = j;
                        }
                        if(j == this.stopSymbolIndex){
                            if(i==0){
                                this.moveToDestination(i,offset);
                            }else{
                                var flag = true;
                                for(var k = 0; k<i; k++){
                                    if(this.reelSpriteReadyAry[k]){
                                        flag = false;
                                    }
                                }
                                if(flag){
                                    this.moveToDestination(i,offset);
                                }
                            }
                        }
                        if(!this.reelSpriteReadyAry[i]){
                            tempBlurSymbol.y += 0;
                        }else{
                            tempBlurSymbol.setPositionY(605 - offset);
                            tempBlurSymbol.y += this.speedAry[i];
                        }
                    }else{
                        tempBlurSymbol.setPositionY(605 - offset);
                        tempBlurSymbol.y += this.speedAry[i];
                    }
                }else{
                    tempBlurSymbol.y += this.speedAry[i];
                }
            }
            //reel sprite move

        }
    },
    delayIndex:0,
    delayRollingSetting:function(){
//        cc.log("-------------------")
        this.velocityAry[this.delayIndex] = this.defaultVelocity;
        this.delayIndex +=1;
    },
    prepareResult:function(){
//        cc.log("prepareResult-----")
        this.moveReelSpriteFlag = false;
        if(resultIndex==0){
//            resultIndex = Math.floor(Math.random()*5);
            resultIndex+=1;
        }else{
            if(resultIndex>=6){
                resultIndex=0;
            }else{
                resultIndex+=1;
            }
        }
        cc.log("resultIndex====="+resultIndex)
        var offsetY = this.symbolHeight+this.symbolGap;
        for (var i = 0; i<this.reelNum; i++) {
            for (var j = 0; j < this.symbolNum; j++) {
                var symbol =  this.symbolGrad[i][j];
                var symbolIndex = symbolResults[resultIndex][j][i];
                var frame = cc.spriteFrameCache.getSpriteFrame("Symbol_0"+symbolIndex+".png");
                symbol.setSpriteFrame(frame);
            }
            var reelSprite = this.reelSpriteAry[i];
//            reelSprite.x +=20;//for test the position
            reelSprite.y = offsetY*this.symbolNum;
        }
    },
    stopRoll:function(){
        this.stopRollFlag = true;
    },
    reelSpriteReadyAry:[true,true,true,true,true],
    moveToDestination:function(reelIndex,offset){
        var isReady = this.reelSpriteReadyAry[reelIndex];
        if(isReady){
//            cc.log("---------="+reelIndex)
            this.reelSpriteReadyAry[reelIndex] = false;
            var reelSprite = this.reelSpriteAry[reelIndex];
            reelSprite.y = 121*6 - offset;
            var moveAnim = cc.moveTo(2, cc.p(reelSprite.x, 0));
            var easeMove = moveAnim.easing(cc.easeBackOut());
            var onComplete = cc.callFunc(this.finishRoll,this);
            reelSprite.runAction(cc.sequence(moveAnim,onComplete));
//            cc.log("---------="+reelSprite.y)
        }

    },
    finishRoll:function(){
        if(this.reelSpriteReadyAry[4] == false){
            this.resetInfo();
            var delay = cc.delayTime(1);
            var onComplete = cc.callFunc(this.showWin,this);
            this.runAction(cc.sequence(delay,onComplete));
        }
    },
    resetInfo:function(){
        this.unscheduleUpdate();
        this.reelSpriteReadyAry = [true,true,true,true,true];
        this.stopSymbolIndex = -1;
        this.moveReelSpriteFlag = true;
        this.rollStopedFlag = true;
        this.stopRollFlag = false;
        this.speedAry = [2,2,2,2,2];
        this.velocityAry = [0,0,0,0,0];

        var offsetX = this.columnWidth+this.columnGap;
        var offsetY = this.symbolHeight+this.symbolGap;
        for (var i = 0; i<this.reelNum; i++) {
            for (var j = 0; j<this.symbolNum; j++) {
                var blueSymbol = this.blurSymbolGrad[i][j];
                blueSymbol.setPosition(offsetX*i,offsetY*(j+this.symbolNum-1));
            }
        }
    },
    showWin:function(e,point){
        var isWinningSpin;
        if(resultIndex<3){
            isWinningSpin = true;
        }else{
            isWinningSpin = false;
        }
        if(isWinningSpin){
            this.setVisible(false)
            this.curScene.showWins(true);
        }else{
            this.curScene.setAvailable();
        }
    },
    getRandonSymbolName:function(){
        var tempNum = Math.ceil(Math.random()*12);
        var num = tempNum>9?tempNum:"0"+tempNum;
        var symbolName = "Symbol_"+num+".png";
        return symbolName;
    },
    getBlurRandonSymbolName:function(){
        var tempNum = Math.ceil(Math.random()*12);
        var num = tempNum>9?tempNum:"0"+tempNum;
        var symbolName = "blur_Symbol_"+num+".png";
        return symbolName;
    }
})