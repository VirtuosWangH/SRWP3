/**
 * Created by wanghe on 2014/9/12.
 */
var TestResolution = cc.Layer.extend({
    size: null,
    controlBar:null,
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


        cc.view.setResizeCallback(this.resetLayout.bind(this));


//        cc.screen.requestFullScreen(null,this.onFullScreeChange);//try to enter full screen
//        cc.screen.fullScreen()//check if it is in full screen
//        cc.screen.exitFullScreen()//exit full screen
//        cc.container//put canvas into a Div container auto by init
    },





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
        var bg = new cc.Sprite(spriteFrame);
        bg.setPosition(cc.p(this.size.width/2,this.size.height/2));
        this.addChild(bg)

        cc.spriteFrameCache.addSpriteFrames(res.textureTablet_plist,res.textureTablet_png);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("baseUI/background_iPad.png")
        var fg = new cc.Sprite(spriteFrame);
//        fg.setAnchorPoint(0, 0);
        fg.setPosition(this.size.width/2, this.size.height/2);
        this.addChild(fg);
    },
    createControlBar:function(){
        this.controlBar = new ControlBarLayer();
        this.controlBar.x = this.size.width/2;
        this.controlBar.y = this.size.height - this.controlBar.height/2;
        this.addChild(this.controlBar);
    },

    resetLayout:function(){
//        cc.view.adjustViewPort(true);
//        cc.view.resizeWithBrowserSize(true);
//        cc.view.getResolutionPolicy

//        cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_HEIGHT);
//        cc.log("tVisibleSize-width="+cc.view.getVisibleSize().width);
//        cc.log("ViewPort-width="+cc.view.getViewPortRect().width);

        // 做任何你所需要的游戏内容层面的适配操作
        // 比如说，你可以针对用户的移动设备方向来决定所要应用的适配模式
        // 比如说 获取宽度和高度，如果宽度大于高度就是横屏， 如果宽度小于高度就是竖屏

//        cc.log("frame-width="+cc.view.getFrameSize().width);
//        cc.log("frame-height="+cc.view.getFrameSize().height);
        var scale = cc._canvas.height / this.size.height;

        cc.log("reset layout==============");

        cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_HEIGHT);
    }
})