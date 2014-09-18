/**
 * Created by wanghe on 2014/8/18.
 */
var WinLinesLayer = cc.Layer.extend({
    size:null,
    curScene:null,
    linesAry:null,
    currentLineNum:null,
    winLineClipper:null,
    stencil:null,

    ctor:function(){
        this._super();
//        this.setVisible(false);
        this.size = cc.director.getWinSize();

        cc.spriteFrameCache.addSpriteFrames(res.textureLine01_plist);
        cc.spriteFrameCache.addSpriteFrames(res.textureLine02_plist);
        cc.spriteFrameCache.addSpriteFrames(res.textureLine03_plist);
        cc.spriteFrameCache.addSpriteFrames(res.textureAssets01_plist);
        this.createUI();

        this.winLineClipper = new cc.ClippingNode();
//        this.winLineClipper.setTag("winLineClipper");
        this.winLineClipper.setContentSize(this.size.width, this.size.height);
        this.winLineClipper.setAnchorPoint(0.5,0.5);
        this.winLineClipper.setPosition(this.size.width/2,this.size.height/2);
        this.addChild(this.winLineClipper);
        this.winLineClipper.setInverted(true);

        this.stencil = cc.Sprite.create();
        this.stencil.setPosition(185,this.size.height/2+100);
        this.winLineClipper.setStencil(this.stencil);
    },
    createUI:function(){
        this.linesAry = [];
        for (var i=1; i<23; i++) {
            var index = i < 10 ? "0" + i : i;
            var winLineName = "winline-0" + index + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(winLineName);
            var line = new cc.Sprite(spriteFrame);
            line.setPosition(this.size.width/2,this.size.height/2)
            this.addChild(line);
            this.linesAry.push(line);
        }
        for (var j=23; j<40; j++) {
            var winLineName = "winline-0" + j + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(winLineName);
            var line = new cc.Sprite(spriteFrame);
            line.setPosition(this.size.width/2,this.size.height/2)
            this.addChild(line);
            this.linesAry.push(line);
        }
        for (var k=40; k<51; k++) {
            var winLineName = "winline-0" + k + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(winLineName);
            var line = cc.Sprite.createWithSpriteFrame(spriteFrame);
            line.setPosition(this.size.width/2,this.size.height/2)
            this.addChild(line);
            this.linesAry.push(line);
        }
        this.currentLineNum = 50;
    },
    addBetLine:function(){
        var tempNum = this.currentLineNum;
        if(tempNum==50){
            tempNum = 1;
        }else{
            tempNum += 1;
        }
        this.curScene.betLineChange(tempNum);
        this.hideWinLineClipper()
    },
    changeBetLine:function(num){
        if(this.currentLineNum != num){
            this.currentLineNum = num;
        }
        for(var i=0; i<50; i++){
            var line = this.linesAry[i];
            if(i<this.currentLineNum){
                line.setVisible(true);
            }else{
                line.setVisible(false);
            }
        }
        this.hideWinLineClipper()
    },
    hideWinLineClipper:function(){
        if(this.winLineClipper){
            this.winLineClipper.setVisible(false);
        }
    },
    resetClipper:function(){
        if(this.winLineClipper){
            this.winLineClipper.removeAllChildren();
            this.stencil.removeAllChildren();
        }
    },
    showWinLine:function(index){
        this.setVisible(true);

        for(var i=0; i<50; i++){
            var line = this.linesAry[i];
//            if(i == index){
//                line.setVisible(true);
//                tempLine = line;
//            }else{
                line.setVisible(false);
//            }
        }

        var num;
        if(resultIndex==2){
            num = 4
        }else{
            num = 5
        }
        for (var j=0; j<num; j++) {
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("symbolMask.png");
            var tempStencil = cc.Sprite.createWithSpriteFrame(spriteFrame);
            tempStencil.setPosition(j*165,0);
            this.stencil.addChild(tempStencil);
        }
        this.winLineClipper.setStencil(this.stencil);
        this.winLineClipper.setVisible(true);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("winline-002.png");
        var tempLine = cc.Sprite.createWithSpriteFrame(spriteFrame);
        tempLine.setPosition(this.size.width/2,this.size.height/2);
//        var tempLine = cc.LayerColor.create(cc.c4b(0,255,255,255),this.size.width,this.size.height);

        this.winLineClipper.addChild(tempLine);
    }
})