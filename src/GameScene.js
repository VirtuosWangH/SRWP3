/**
 * Created by wanghe on 2014/8/14.
 */
var resultIndex = 0;
var GameScene = cc.Scene.extend({
    size:null,
    initLabel:null,
    isAvailableSpin:true,
    symbolLayer:null,
    controlBar:null,
    winningLayer:null,
    payTableLayer:null,
    winLinesLayer:null,
    winFrameLayer:null,
    betLineSelectorLayer:null,
    titleLayer:null,

    ctor:function(){
        this._super();
        this.tagName = "gameScene";
    },
    onEnter:function(){
        this._super();
//        cc.log("====onEnter=======================")
        this.initDeviceMenuHandler();
        this.initByMe();
//        this.initTest();
    },
    initDeviceMenuHandler:function(){
        cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,
            onKeyReleased:function(keyCode,event){
                if(keyCode == cc.KEY.back){
                    cc.log("backClick-------------");
                    cc.director.end();
                };
                if(keyCode == cc.KEY.menu){
                    cc.log("menuClick-------------");
                    cc.director.pause();//just pause render
                }
            }
        },this);
        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE,function(){
            cc.log("EVENT_HIDEClick-------------");
        });
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW,function(){
            cc.log("EVENT_SHOWClick-------------");
        })

    },
    initByMe:function () {
//        cc.log("initByMe============="+Date.now());
        this.size = cc.director.getWinSize();
        this.initLabel = new cc.LabelTTF("Loading...", "Arial", 24);
        this.initLabel.setPosition(this.size.width/2,this.size.height/2);
        this.initLabel.setColor(cc.color(180, 180, 180));
        this.addChild(this.initLabel);

//        addSpriteFrames will consume a lot of time
//        cc.spriteFrameCache.addSpriteFrames(res.textureAssets01_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.textureAssets02_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.textureTablet_plist,res.textureTablet_png);
//        cc.spriteFrameCache.addSpriteFrames(res.textureControl_plist,res.textureControl_png);
//        cc.spriteFrameCache.addSpriteFrames(res.textureLine01_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.textureLine02_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.textureLine03_plist);

        if(!cc.sys.isMobile){
            this.initLabel.visible = false;
            this.initLater();
        }else{
            this.scheduleOnce(this.initLater,0.1);
//            this.percentUnit = Math.floor(100/this.assetsAry.length);
//            this.scheduleOnce(this.prepareAssets,0.01);
        }
    },
    percent:0,
    percentUnit:0,
    assetsAry:[res.textureAssets01_plist,res.textureAssets02_plist,
        res.textureTablet_plist,res.textureControl_plist,
        res.textureLine01_plist,res.textureLine02_plist,res.textureLine03_plist],
    prepareAssets:function(){
        cc.spriteFrameCache.addSpriteFrames(this.assetsAry[this.percent]);
        this.percent +=1;
        this.initLabel.setString("Loading..."+this.percent*this.percentUnit+"%");
//        cc.log("percent============"+this.initLabel.string);
        if(this.percent<7){
            this.runAction(cc.sequence(
                cc.delayTime(0.01),
                cc.callFunc(this.prepareAssets, this)
            ));
        }else{
            this.initLater();
        }
    },
    initLater:function(){
//        cc.log("initLater============"+Date.now());
        this.addChild(new BGLayer());

//        this.symbolLayer = SymbolLayer.create();
        this.symbolLayer = new SymbolNewLayer();
        this.symbolLayer.curScene = this;
        this.addChild(this.symbolLayer);

        this.addChild(new FGLayer());

        this.betLineSelectorLayer = new BetLineSelectorLayer();
        this.betLineSelectorLayer.curScene = this,
            this.addChild(this.betLineSelectorLayer);

        this.titleLayer = new TitleLayer();
        this.titleLayer.setPosition(this.size.width/2,this.size.height - 50);
        this.addChild(this.titleLayer)

        this.controlBar = new ControlBarLayer();
        this.controlBar.curScene = this;
        this.controlBar.setAnchorPoint(1,1);
        this.controlBar.setPosition(512,55);
        this.addChild(this.controlBar);

        this.winningLayer = new WinningLayer();
        this.addChild(this.winningLayer);

        this.winLinesLayer = new WinLinesLayer();
        this.winLinesLayer.curScene = this;
        this.addChild(this.winLinesLayer);

        this.winFrameLayer = new WinFrameLayer();
        this.addChild(this.winFrameLayer);

        this.payTableLayer = new PayTableLayer();
        this.addChild(this.payTableLayer);

        this.soundManger = new SoundManger();
        this.soundManger.playMusic(sounds.gameStart, false);
//        cc.log("playMusic============"+Date.now())
        this.removeChild(this.initLabel);
    },
    initTest:function(){
//        var lineClipping = new TestLineClipping();
//        this.addChild(lineClipping);

//        var testXmlLayer = new TestXML();
//        testXmlLayer.setAnchorPoint(0,0);
//        testXmlLayer.setPosition(0,0);
//        this.addChild(testXmlLayer);

//        var testBlend = new TestBlendFunction();
//        this.addChild(testBlend);

//        var runningMode = new TestRunningMode();
//        this.addChild(runningMode);

//        var testEventManager = new TestEventManager();
//        this.addChild(testEventManager);
//        cc.eventManager.addCustomListener(TestEvent,this.eventListener);

        var testResolution = new TestResolution();
        this.addChild(testResolution);
    },
    eventListener:function(){
        cc.log("======")
    },
    startSpin:function(){
        this.isAvailableSpin = false;
        this.symbolLayer.setVisible(true);
        this.symbolLayer.startRoll();
        this.winLinesLayer.setVisible(false);
        this.winLinesLayer.resetClipper();
        this.winFrameLayer.removeFrames();

        this.soundManger.playEffect(sounds.click, false);
        this.soundManger.playEffect("spin", false);
    },
    setAvailable:function(){
        this.isAvailableSpin = true;
    },
    showWins:function(isShow){
        if(isShow){
            this.isAvailableSpin = true;
            this.winLinesLayer.showWinLine(1);
            var symbolAry;
            if(resultIndex==2){
                symbolAry = [[],[1,1,1,1,0],[],[]];
                this.titleLayer.switchTitle("normal");
            }else{
                symbolAry = [[],[1,1,1,1,1],[],[]];
                this.titleLayer.switchTitle("fiveOfAKind");
            }
            this.winFrameLayer.showWinFrame(2,symbolAry);
            this.soundManger.playMusic(sounds.win0, false);
        }else{
            this.titleLayer.switchTitle("normal");
            this.symbolLayer.setVisible(true);
            this.winLinesLayer.setVisible(false);
            this.winFrameLayer.removeFrames();
        }
        this.winningLayer.showWins(isShow);
    },
    showPayTable:function(isShow){
        this.payTableLayer.show(isShow);

        this.soundManger.playEffect(sounds.click, false);
    },
    betLineChange:function(num){
        this.winLinesLayer.setVisible(true);
        this.winLinesLayer.changeBetLine(num);
        this.betLineSelectorLayer.updateBetLine(num);
        this.winFrameLayer.removeFrames();

        this.soundManger.playEffect(sounds.click, false);
    },

////////////////////////////////////////////////////////////
    onEnterTransitionDidFinish: function () {
        this._super();
//        cc.log("====onEnterTransitionDidFinish=======================")
    },
    onExitTransitionDidStart: function () {
        this._super();
//        cc.log("====onExitTransitionDidStart=======================")
    }

///////////////////////////////////////////////////////////

})