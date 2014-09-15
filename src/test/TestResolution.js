/**
 * Created by wanghe on 2014/9/12.
 */
var TestResolution = cc.Layer.extend({
    size: null,
    ctor: function () {
        this._super();

        this.size = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.textureLine01_plist);
        cc.spriteFrameCache.addSpriteFrames(res.textureAssets01_plist);

        this.createBG();
        this.createControlBar();
        cc.ResolutionPolicy.FIXED_WIDTH
        var resolution = new cc.ResolutionPolicy(cc.ContainerStrategy.PROPORTION_TO_FRAME,cc.ContentStrategy.EXACT_FIT);
        cc.view.setResolutionPolicy(resolution)
        cc.view.setResizeCallback(this.resetLayout);
    },


//        cc.screen.requestFullScreen(null,this.onFullScreeChange);
//        cc.screen.fullScreen()
//        cc.screen.exitFullScreen()
//        cc.container//put canvas into a Div container auto by init


//    var size = cc.view.getFrameSize()
//        cc.director.sharedDirector._runningScene.orientation  = cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT;
//        cc.director.sharedDirector.setOrientation(cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT);
//        cc.director.sharedDirector.setOrientation(cc.ORIENTATION_PORTRAIT);
//    onFullScreeChange:function(){
//        cc.log("goToFullScreen------------");
//    },
    createBG:function(){
        cc.spriteFrameCache.addSpriteFrames(res.textureTablet_plist);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("baseUI/background_wood_ipad.png");
        var bg = cc.Sprite.createWithSpriteFrame(spriteFrame);
        bg.setPosition(cc.p(this.size.width/2,this.size.height/2));
        this.addChild(bg)

        cc.spriteFrameCache.addSpriteFrames(res.textureTablet_plist,res.textureTablet_png);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("baseUI/background_iPad.png")
        var fg = cc.Sprite.createWithSpriteFrame(spriteFrame);
//        fg.setAnchorPoint(0, 0);
        fg.setPosition(this.size.width/2, this.size.height/2);
        this.addChild(fg);
    },
    createControlBar:function(){
        var controlBar = new ControlBarLayer();
        controlBar.x = this.size.width/2;
        controlBar.y = controlBar.height/2;
        this.addChild(controlBar);
    },

    resetLayout:function(){
//        cc.view.adjustViewPort(true);
//        cc.view.resizeWithBrowserSize(true);
//        cc.view.getResolutionPolicy

        cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_HEIGHT)
        cc.log("reset layout--------------");
    }
})