/**
 * Created by wanghe on 2014/8/18.
 */
var WinFrameLayer = cc.Layer.extend({
    winFrames:null,

    ctor:function(){
        this._super();
        this.setPosition(185,205);
        this.initEventListener();
//        this.setVisible(false);
        this.winFrames = [];
        cc.spriteFrameCache.addSpriteFrames(res.textureTablet_plist);
        this.createUI();
    },
    initEventListener:function(){
        cc.eventManager.addCustomListener(CEvent.BetOne,this.betOneListener.bind(this));
    },
    createUI:function(){
//        var winTab = cc.Sprite.createWithSpriteFrameName("wintab/winboxbg-001.png");
//        this.addChild(winTab);
//
//        var winFrame = cc.Sprite.createWithSpriteFrameName("winbox/winframe-001.png");
//        this.addChild(winFrame);
//
//        var winNum = cc.Sprite.createWithSpriteFrameName("winnumbers/wincircle-001.png");
//        this.addChild(winNum);
    },
    showWinFrame:function(lineIndex,symbolAry){
        var rowNum = symbolAry.length;
        var index = lineIndex>9?lineIndex:"0"+lineIndex;
        var firstFrameY = null;
        for (var i=0; i<rowNum; i++) {
            var symbolNum = symbolAry[i].length;
            for (var j=0; j<symbolNum; j++) {
                var value = symbolAry[i][j];
                if(value){
                    var frameName = "winframe-0"+index+".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName)
                    var winFrame = cc.Sprite.createWithSpriteFrame(spriteFrame);
                    var targetX = j*165;
                    var targetY = (3-i)*121;
                    if(firstFrameY == null){
                        firstFrameY = targetY;
                    }
                    winFrame.setPosition(targetX,targetY);
                    this.addChild(winFrame);
                    this.winFrames.push(winFrame)
                }
            }
        }

        var circleName = "wincircle-0"+index+".png";
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(circleName);
        var lineNum = cc.Sprite.createWithSpriteFrame(spriteFrame);
        lineNum.setPosition(-70,firstFrameY);
        this.addChild(lineNum);

        var tabName = "winboxbg-0"+index+".png";
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(tabName);
        var winTab = cc.Sprite.createWithSpriteFrame(spriteFrame);
        winTab.setPosition(0,firstFrameY-55);
        this.addChild(winTab);

        var valueText = cc.LabelTTF.create("20",null,22);
        valueText.setPosition(winTab.getPosition().x,winTab.getPosition().y);
        this.addChild(valueText);
    },
    removeFrames:function(lineIndex){
        this.removeAllChildren();
    },
    betOneListener:function(event){
        this.removeFrames();
    }
})