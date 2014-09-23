/**
 * Created by wanghe on 2014/8/13.
 */
var ControlBarLayer = cc.Layer.extend({
    curScene:null,
    spinBtn:null,
    betMaxItem:null,
    isShowPayTable:false,
    ctor:function(){
        this._super();
        this.tagName = "controlBar"

        cc.spriteFrameCache.addSpriteFrames(res.textureControl_plist,res.textureControl_png);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("GamecontrolsBg.png");
        var bg = cc.Sprite.createWithSpriteFrame(spriteFrame);
        this.addChild(bg);

        spriteFrame = cc.spriteFrameCache.getSpriteFrame("SpinBtn.png");
        var spinNormal = cc.Sprite.createWithSpriteFrame(spriteFrame);
        var spinSelect = cc.Sprite.createWithSpriteFrame(spriteFrame);
        spinSelect.setOpacity(80);
        this.spinBtn = cc.MenuItemSprite.create(spinNormal, spinSelect,this.onSpin,this);

        spriteFrame = cc.spriteFrameCache.getSpriteFrame("PaytableBtn.png");
        var psyTableNormal = cc.Sprite.createWithSpriteFrame(spriteFrame);
        var psyTableSelect = cc.Sprite.createWithSpriteFrame(spriteFrame);
        var payTableItem = cc.MenuItemSprite.create(psyTableNormal,psyTableSelect,this.onPaytable,this);

        spriteFrame = cc.spriteFrameCache.getSpriteFrame("BetMaxBtn.png");
        var betMaxNormal = cc.Sprite.createWithSpriteFrame(spriteFrame);
        var betMaxSelect = cc.Sprite.createWithSpriteFrame(spriteFrame);
        betMaxSelect.setScale(0.9,0.9);
        this.betMaxItem = cc.MenuItemSprite.create(betMaxNormal,betMaxSelect,this.onBetMax,this);

        spriteFrame = cc.spriteFrameCache.getSpriteFrame("BetOneBtn.png");
        var betOneNormal = cc.Sprite.createWithSpriteFrame(spriteFrame);
        var betOneSelect = cc.Sprite.createWithSpriteFrame(spriteFrame);
        betOneSelect.setScale(0.9,0.9)
        var betOneItem = cc.MenuItemSprite.create(betOneNormal,betOneSelect,this.onBetOne,this);

        var menu = cc.Menu.create(payTableItem,betOneItem,this.betMaxItem,this.spinBtn);
        menu.alignItemsHorizontallyWithPadding(10);
        menu.setPosition(bg.getPositionX(),bg.getPositionY());
        this.setContentSize(cc.size(bg.width,bg.height));
        this.addChild(menu, 1);
    },
    onEnter:function(){
        this._super();
    },
    onSpin:function (pSender) {
        if(this.curScene.isAvailableSpin){
            this.curScene.startSpin();
            this.curScene.showWins(false);
        }
    },
    onPaytable:function (pSender) {
        if(this.curScene.isAvailableSpin){
            this.isShowPayTable = !this.isShowPayTable;
            this.curScene.showPayTable(this.isShowPayTable);
        }
    },
    alreadyMax:false,
    onBetMax:function(){
        if(this.curScene.isAvailableSpin && !this.alreadyMax){
            this.curScene.showWins(false);
            this.curScene.betLineChange(50);
            this.alreadyMax = true;
        }
    },
    onBetOne:function(){
        if(this.curScene.isAvailableSpin){
            this.curScene.showWins(false);
            this.curScene.addOneBetLine();
            this.alreadyMax = false;
        }
    }
})