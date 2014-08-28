/**
 * Created by wanghe on 2014/8/22.
 */
var TestXML = cc.Layer.extend({
    winLineSpriteBatchNode:null,
    size:null,
    textureCache:null,
    ctor:function(){
        this._super();
        this.size = cc.director.getWinSize();
        var colorBg = cc.LayerColor.create(cc.color(0,255,255,255),this.size.width,this.size.height);
        this.addChild(colorBg);

        this.createUI()
    },
    preLoadImage:function(){
        this.textureCache = cc.textureCache;
        this.textureCache.addImage("res/exported/winLines/tile.png", this.createUI, this);
    },
    createUI:function(){
        var saxParser = new cc.SAXParser();
//        var result = saxParser.parse("res/exported/line01.plist");
//        var jsonResult = JSON.stringify(result);

        this.winLineSpriteBatchNode = cc.SpriteBatchNode.create("res/exported/winLines/tile.png", 100);
//        this.winLineSpriteBatchNode = cc.Sprite.create();
        this.winLineSpriteBatchNode.setAnchorPoint(0,0);
        this.winLineSpriteBatchNode.setContentSize(960,640);
        this.addChild(this.winLineSpriteBatchNode);
        for (var i=1; i<12; i++) {
            var winLineIndex = i>9?i:"0"+i;
            var winLineXmlText = "res/exported/winLines/winline-0"+winLineIndex+".xml";
            var xmlStr = cc.loader.getRes(winLineXmlText);
            var winLineXml = saxParser.parse(xmlStr);
            var IndexLixt = winLineXml.childNodes[0].children;
            var tileNum = IndexLixt.length;

            for (var j=0; j<tileNum; j++) {
                var attributes = IndexLixt[j].attributes;
                var tileIdx = attributes.idx.value;
                var tileSprite = this.createWinLineTileSprite(tileIdx);

                var tileOffset = attributes.offset.value;
                var targetX = ((tileOffset%30)-1)*32
                var targetY = 640 - (Math.ceil(tileOffset/30)-1)*32;

                tileSprite.setPosition(targetX,targetY);

//                this.addChild(tileSprite);
                this.winLineSpriteBatchNode.addChild(tileSprite);
            }
        }
        cc.log("----------finished-----------")
    },
    createWinLineTileSprite:function(tileIdx){
        var img =cc.textureCache.addImage("res/exported/winLines/tile.png");
        var saxParser = new cc.SAXParser();
        var xmlStr = cc.loader.getRes("res/exported/winLines/tile.xml");
        var winLineXml = saxParser.parse(xmlStr);
        var tileList = winLineXml.childNodes[0].children;
        var tileNum = tileList.length;
        for (var i=0; i<tileNum; i++) {
            var tileAttributes = tileList[i].attributes;
            var tileName = tileAttributes.name.value;
            if(tileIdx == tileName){
                var tileSprite = new cc.Sprite();
                var subTextureX = Number(tileAttributes.x.value);
                var subTextureY = Number(tileAttributes.y.value);
                var subTextureW = Number(tileAttributes.width.value);
                var subTextureH = Number(tileAttributes.height.value);

                tileSprite.initWithTexture(img,cc.rect(subTextureX,subTextureY,subTextureW,subTextureH));

                return tileSprite;
            }
        }
    }
})
