/**
 * Created by wanghe on 2014/8/13.
 */
var BGLayer = cc.Layer.extend({
    ctor:function(){
       this._super();

       this.init();
    },
    init:function () {
        this._super();

        var size = cc.director.getWinSize();

        cc.spriteFrameCache.addSpriteFrames(res.textureTablet_plist);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("background_wood_ipad.png");
        var bg = cc.Sprite.createWithSpriteFrame(spriteFrame);

        bg.setPosition(cc.p(size.width/2,size.height/2));
        this.addChild(bg);
    }
})
