/**
 * Created by wanghe on 2014/8/20.
 */
var SymbolNewLayer = cc.Layer.extend({
    curScene: null,
    ctor:function(){
        this._super();
//        this.setTag("newSymbolLayer");
        this.tagName = "test";
        cc.spriteFrameCache.addSpriteFrames(res.textureAssets01_plist);
        cc.spriteFrameCache.addSpriteFrames(res.textureAssets02_plist);
        cc.spriteFrameCache.addSpriteFrames(res.textureLine01_plist);
        this.setPosition(185,205);
        this.setup();
    },
    init:function () {
        cc.log("init is not invoke except using cc.layer.create()");
    },
    onEnter:function(){
        this._super();

//        var symbol = cc.Sprite.createWithSpriteFrameName(this.getRandonSymbolName());
//        this.addChild(symbol);
//        this.setup();
    },
    onEnterTransitionDidFinish:function(){
        cc.log();
    },
    setup:function () {
        var clipper = cc.ClippingNode.create();
//        clipper.setTag("TestClipper");
        clipper.setContentSize(300, 300);
        clipper.setAnchorPoint(0.5,0.5);
        clipper.setPosition(150,150);
        this.addChild(clipper);

        var stencil = cc.DrawNode.create();
        var rectangle = [cc.p(0, 0),
            cc.p(clipper.getContentSize().width, 0),
            cc.p(clipper.getContentSize().width, clipper.getContentSize().height),
            cc.p(0, clipper.getContentSize().height)];

        var white = cc.Color(225, 225, 225, 225);
        stencil.drawPoly(rectangle, white, 1, white);
        clipper.setStencil(stencil);

        var content = cc.Sprite.createWithSpriteFrameName("#HelpScreens_01.png");
        content.setAnchorPoint(0.5,0.5);
        content.setPosition(150,150);
        clipper.setInverted(true);
        clipper.addChild(content);
//        content.runAction(cc.RepeatForever.create(cc.RotateBy.create(1, 45)));
//        this.addChild(content)

//        cc.log("----------="+clipper.getContentSize().width)
    },

    getRandonSymbolName:function(){
        var tempNum = Math.ceil(Math.random()*12);
        var num = tempNum>9?tempNum:"0"+tempNum;
        var symbolName = "#Symbol_"+num+".png";
        return symbolName;
    }
})

