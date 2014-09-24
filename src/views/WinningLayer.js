/**
 * Created by wanghe on 2014/8/13.
 */
var WinningLayer = cc.Layer.extend({
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
    symbolGrad:null,
    columnGap:23,
    symbolGap:5,
    columnWidth:142,
    symbolHeight:116,
    winLines:null,
    winSymbol:null,
    animationSymbols:[],
    ctor: function () {
        this._super();
        this.setPosition(185,205);
        this.setVisible(false);
        this.init();
        this.initEventListener()
        cc.spriteFrameCache.addSpriteFrames(res.textureAssets01_plist,res.textureAssets01_png);
    },
    init:function(){
        this._super();
        this.winLines = [
            [[1,2,3,4,5],
             [1,2,3,4,5],
             [7,7,7,7,7],
             [1,2,3,4,5]],
            [[1,2,3,4,5],
             [1,2,3,4,5],
             [8,8,8,8,8],
             [1,2,3,4,5]],
            [[1,2,3,4,5],
             [1,2,3,4,5],
             [9,9,9,9,1],
             [1,2,3,4,5]],
            [[1,2,3,4,5],
             [5,4,3,2,1],
             [5,4,3,2,1],
             [1,2,3,4,5]],
            [[1,2,3,4,5],
             [7,8,3,2,1],
             [5,4,9,2,1],
             [1,2,3,6,5]],
            [[1,2,3,4,5],
             [5,8,3,2,7],
             [5,4,6,2,1],
             [6,2,3,6,5]],
            [[1,2,3,4,7],
             [9,7,3,2,1],
             [6,4,9,2,1],
             [1,2,3,6,5]]
        ]
        this.winSymbol = [7,8,9,0,0,0,0];
    },
    initEventListener:function(){
        cc.eventManager.addCustomListener(CEvent.BetOne,this.betOneListener.bind(this));
    },
    preSetWin:function(){
        this.symbolGrad = [];
        var winSymbols = this.winLines[resultIndex]
        for (var i = 0; i<winSymbols.length; i++) {
            var symbolReel = [];
            for (var j = 0; j<5; j++) {
                var index = winSymbols[i][j];
                var tempSprite;
                if(index!==this.winSymbol[resultIndex]){
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame("Symbol_0"+index+".png")
                    tempSprite = cc.Sprite.createWithSpriteFrame(spriteFrame);
                }else{
                    tempSprite = cc.Sprite.create();
                }
                var offsetX = this.columnWidth+this.columnGap;
                var offsetY = this.symbolHeight+this.symbolGap;
                tempSprite.setPosition(offsetX*j,offsetY*i);
                this.addChild(tempSprite);
                symbolReel.push(tempSprite);
            }
            this.symbolGrad.push(symbolReel);
        };
    },
    showWins:function(isShow){
        if(isShow){
            this.preSetWin();
            var winSymbols = this.winLines[resultIndex];
            this.setVisible(true);
            for (var i = 0; i<winSymbols.length; i++) {
                for (var j = 0; j<5; j++) {
                    var index = winSymbols[i][j];
                    if(index == this.winSymbol[resultIndex]){
                        var tempSprite = this.symbolGrad[i][j];
                        var animFrames = [];
                        var preIndex;
                        var num;
                        if(index == 7){
                            preIndex = 1001;
                            num = 32;
                        }else if(index == 8){
                            preIndex = 2001;
                            num = 31;
                        }else if(index == 9){
                            preIndex = 3001;
                            num = 60;
                        }
                        for(var k = 0; k < num; k++){
                            var symbolIndex = k+preIndex;
                            var frameName = "sym-pic"+symbolIndex+".png";
                            var frame = cc.spriteFrameCache.getSpriteFrame(frameName);
                            animFrames.push(frame);
                        }

                        var animation = cc.Animation.create(animFrames, 0.1);
                        var animate = cc.Animate.create(animation);
                        var seq = cc.Sequence.create(animate);
                        tempSprite.runAction(cc.RepeatForever.create(animate));
                        this.animationSymbols.push(tempSprite);
                    }
                }
            }
        }else{
            this.stopWins();
        }
    },
    stopWins:function(){
        this.setVisible(false);
        while (this.animationSymbols.length) {
            var animationSymbol = this.animationSymbols.pop();
            animationSymbol.stopAllActions();
        }
        if(this.symbolGrad){
            while (this.symbolGrad.length) {
                var symbolReel = this.symbolGrad.pop();
                while(symbolReel.length){
                    var tempSprite = symbolReel.pop();
                    tempSprite.removeFromParent();
                }
            }
        }
    },

    betOneListener:function(event){
        this.showWins(false);
    }
})
