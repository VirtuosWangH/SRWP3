/**
 * Created by wanghe on 2014/8/14.
 */
var GameScene = cc.Scene.extend({
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
        this.initByMe();
//        this.initTest();
    },
    initByMe:function () {
        var size = cc.director.getWinSize();

        this.addChild(new BGLayer());
        this.symbolLayer = SymbolLayer.create();
        this.symbolLayer.curScene = this;
        this.addChild(this.symbolLayer);

//        this.symbolLayer = new SymbolNewLayer();
//        this.symbolLayer.curScene = this;
//        this.addChild(this.symbolLayer);

        this.addChild(new FGLayer());

        this.betLineSelectorLayer = new BetLineSelectorLayer();
        this.betLineSelectorLayer.curScene = this,
        this.addChild(this.betLineSelectorLayer);

        this.titleLayer = new TitleLayer();
        this.titleLayer.setPosition(size.width/2,size.height - 50);
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
    },
    initTest:function(){
//        var lineClipping = new TestLineClipping();
//        this.addChild(lineClipping);

//        var testXmlLayer = new TestXML();
//        testXmlLayer.setAnchorPoint(0,0);
//        testXmlLayer.setPosition(0,0);
//        this.addChild(testXmlLayer);

        var testBlend = new TestBlendFunction();
        this.addChild(testBlend);
    },
    startSpin:function(){
        this.symbolLayer.setVisible(true);
        this.symbolLayer.startRoll();
        this.winLinesLayer.setVisible(false);
        this.winFrameLayer.removeFrames();
    },
    showWins:function(isShow){
        if(isShow){
            this.winLinesLayer.showWinLine(1);
            this.winFrameLayer.showWinFrame(2,[[],[1,1,1,1,1],[],[]]);
            this.titleLayer.switchTitle("fiveOfAKind")
        }else{
            this.titleLayer.switchTitle("normal");
            this.symbolLayer.setVisible(true);
            this.winLinesLayer.setVisible(false);
            this.winFrameLayer.removeFrames();
        }
        this.winningLayer.showWins(isShow);
    },
    showPayTable:function(isShow){
        this.payTableLayer.show(isShow)
    },
    betLineChange:function(num){
        this.winLinesLayer.setVisible(true);
        this.winLinesLayer.changeBetLine(num);
        this.betLineSelectorLayer.updateBetLine(num);
        this.winFrameLayer.removeFrames();
    },
    addOneBetLine:function(){
        this.winLinesLayer.setVisible(true);
        this.winLinesLayer.addBetLine();
        this.winFrameLayer.removeFrames();
    }
})