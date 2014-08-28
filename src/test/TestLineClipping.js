/**
 * Created by wanghe on 2014/8/21.
 */
var TestLineClipping = cc.Layer.extend({
    winLineClipper:null,
    size:null,
    ctor:function(){
        this._super();
        this.size = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.textureLine01_plist);
        cc.spriteFrameCache.addSpriteFrames(res.textureAssets01_plist);

        this.winLineClipper = cc.ClippingNode.create();
        this.winLineClipper.setTag("winLineClipper");
        this.winLineClipper.setContentSize(this.size.width, this.size.height);
        this.winLineClipper.setAnchorPoint(0.5,0.5);
        this.winLineClipper.setPosition(this.size.width/2,this.size.height/2);
        this.addChild(this.winLineClipper);
        this.winLineClipper.setInverted(true);

        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("symbolMask.png");
        var stencil = cc.Sprite.createWithSpriteFrame(spriteFrame);
        stencil.setPosition(this.size.width/2,this.size.height/2+100);
        this.winLineClipper.setStencil(stencil);

//        var tempLine = cc.LayerColor.create(cc.c4b(0,255,255,255),this.size.width,this.size.height);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("winline-002.png");
        var tempLine = cc.Sprite.createWithSpriteFrame(spriteFrame);
        tempLine.setPosition(this.size.width/2,this.size.height/2)

//        this.addChild(tempLine);
        this.winLineClipper.addChild(tempLine);
    }
})
