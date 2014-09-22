/**
 * Created by wanghe on 2014/9/12.
 */
var TestResolution = cc.Layer.extend({
    size: null,
    controlBar:null,
    ctor: function () {
        this._super();
        cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.FIXED_HEIGHT);
        this.size = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.textureLine01_plist);
        cc.spriteFrameCache.addSpriteFrames(res.textureAssets01_plist);

        this.createBG();
//        this.createControlBar();

//        cc.view.setResizeCallback(this.resetLayout.bind(this));

        this.schedule(this.showInfo,100,cc.repeatForever,2);
        //should request by user action
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
        var offsetX = 0;
//        var scaleY = cc.view.getFrameSize().height / 320;
//        var scaleX = cc.view.getFrameSize().width / 480;
//        var winWidth = cc.view.getFrameSize().width/scaleY;
//        var winWidth2 = cc.view.getFrameSize().width/scaleX;
//        var winHeight = 320;
//        cc.view.setDesignResolutionSize(winWidth, winHeight, cc.ResolutionPolicy.SHOW_ALL);
//        offsetX = (cc.view.getVisibleSize().width - this.size.width)/2


        cc.spriteFrameCache.addSpriteFrames(res.textureTablet_plist);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("bg.png");
        var bg = new cc.Sprite(spriteFrame);
        bg.setPosition(cc.p(this.size.width/2,this.size.height/2));
        this.addChild(bg)

        var leftBarFrame = cc.spriteFrameCache.getSpriteFrame("background_wood_ipad.png");
        var leftBar = new cc.Sprite(leftBarFrame);
        leftBar.setAnchorPoint(1,0.5)
        leftBar.setPosition(cc.p(offsetX,this.size.height/2));
        this.addChild(leftBar);

        cc.spriteFrameCache.addSpriteFrames(res.textureTablet_plist,res.textureTablet_png);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("background_ipad_bonus.png")
        var fg = new cc.Sprite(spriteFrame);
        fg.setPosition(this.size.width/2+offsetX, this.size.height/2);
        this.addChild(fg);

        offsetX = (this.size.width - fg.width)/2;
        leftBar.setPosition(cc.p(offsetX,this.size.height/2));
        offsetX = 0;

        var centerPoint = cc.p(this.size.width/2+offsetX,this.size.height/2)
        var centerFrame = cc.spriteFrameCache.getSpriteFrame("wincircle-006.png");
        var center = new cc.Sprite(centerFrame);
        center.setPosition(centerPoint);
        this.addChild(center);

        var leftTopFrame = cc.spriteFrameCache.getSpriteFrame("wincircle-006.png");
        var leftTop = new cc.Sprite(leftTopFrame);
        leftTop.setPosition(centerPoint.x-240,centerPoint.y+160);
        this.addChild(leftTop);

        var rightTopFrame = cc.spriteFrameCache.getSpriteFrame("wincircle-006.png");
        var rightTop = new cc.Sprite(rightTopFrame);
        rightTop.setPosition(centerPoint.x+240,centerPoint.y+160);
        this.addChild(rightTop);

        var leftBottomFrame = cc.spriteFrameCache.getSpriteFrame("wincircle-006.png");
        var leftBottom = new cc.Sprite(leftBottomFrame);
        leftBottom.setPosition(centerPoint.x-240,centerPoint.y-160);
        this.addChild(leftBottom);

        var rightBottomFrame = cc.spriteFrameCache.getSpriteFrame("wincircle-006.png");
        var rightBottom = new cc.Sprite(rightBottomFrame);
        rightBottom.setPosition(centerPoint.x+240,centerPoint.y-160);
        this.addChild(rightBottom);
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
    },
    showInfo:function(){
        cc.log("===========================================");
        cc.log("FrameSizeW=="+cc.view.getFrameSize().width);
        cc.log("FrameSizeH=="+cc.view.getFrameSize().height);
        cc.log("WinSizeW=="+this.size.width);
        cc.log("WinSizeH=="+this.size.height);
        cc.log("VisibleSizeW=="+cc.view.getVisibleSize().width);
        cc.log("VisibleSizeH=="+cc.view.getVisibleSize().height);
        cc.log("VisibleOriginalX=="+cc.view.getVisibleOrigin().x);
        cc.log("VisibleOriginalY=="+cc.view.getVisibleOrigin().y);
        cc.log("ScaleX=="+cc.view.getScaleX());
        cc.log("ScaleY=="+cc.view.getScaleY());
    }
})