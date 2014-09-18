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
    animationSymbols:[],
    ctor: function () {
        this._super();
        this.setPosition(185,205);
        this.setVisible(false);
        this.init();
        cc.spriteFrameCache.addSpriteFrames(res.textureAssets01_plist,res.textureAssets01_png);
    },
    init:function(){
        this._super();
        var winSymbols1 = [
            [1,2,3,4,5],
            [5,4,3,2,1],
            [7,7,7,7,7],
            [1,2,3,4,5]
        ];
        var winSymbols2 = [
            [1,2,3,4,5],
            [2,2,2,2,2],
            [5,4,3,2,1],
            [1,2,3,4,5]
        ];
        this.winLines = [winSymbols1,winSymbols2];
        this.symbolGrad = [];
        var winSymbols = this.winLines[1]
        for (var i = 0; i<winSymbols.length; i++) {
            var symbolReel = [];
            for (var j = 0; j<5; j++) {
                var index = winSymbols[i][j];
                var tempSprite;
                if(index!==7){
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
            var winSymbols = this.winLines[0];
            this.setVisible(true);
            for (var i = 0; i<winSymbols.length; i++) {
                for (var j = 0; j<5; j++) {
                    var index = winSymbols[i][j];
                    if(index == 7){
                        var tempSprite = this.symbolGrad[i][j];
                        var animFrames = [];
                        for(var k = 0; k < 32; k++){
                            var index = k+1001;
                            var frameName = "sym-pic"+index+".png";
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
    }
})
