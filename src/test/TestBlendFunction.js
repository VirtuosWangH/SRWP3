/**
 * Created by wanghe on 2014/8/25.
 */
var TestBlendFunction = cc.Layer.extend({
    winLineClipper: null,
    size: null,
    ctor: function () {
        this._super();

        this.size = cc.director.getWinSize();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureLine01_plist);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureAssets01_plist);

        //1 create renderTexture
        var renderTexture = cc.RenderTexture.create(this.size.width,this.size.height);

        //2 create mask and target sprite
        var mask = cc.LayerColor.create(cc.c4b(225,255,255,255),200,200);
        mask.setPosition(this.size.width/2,this.size.height/2);
        var tempLine = cc.LayerColor.create(cc.c4b(0,255,255,255),this.size.width,this.size.height);
//        var tempLine = cc.Sprite.createWithSpriteFrameName("winline-002.png");
//        tempLine.setPosition(this.size.width/2,300);

        //3 set blendFunc
        mask.setBlendFunc(gl.ONE,gl.ZERO);
        tempLine.setBlendFunc(0x304,gl.ZERO);//cocos3.0 will support cc.DST_ALPHA = 0x304;

        //4 render
        renderTexture.begin();
        mask.visit();
        tempLine.visit();
        renderTexture.end();

        //5 new sprite texture
        var texture = renderTexture.getSprite().getTexture();
        var newSprite = cc.Sprite.createWithTexture(texture);
        newSprite.setPosition(this.size.width/2,this.size.height/2);
        this.addChild(newSprite);
    }
})