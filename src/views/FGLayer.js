/**
 * Created by wanghe on 2014/8/13.
 */
var FGLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        this.init();
    },
    init:function () {
        this._super();

        var size = cc.director.getWinSize();

        cc.spriteFrameCache.addSpriteFrames(res.textureTablet_plist,res.textureTablet_png);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("background_iPad.png")
        var fg = cc.Sprite.createWithSpriteFrame(spriteFrame);
        fg.setAnchorPoint(0, 0);
        fg.setPosition(0, 0);
        this.addChild(fg);
    }
})