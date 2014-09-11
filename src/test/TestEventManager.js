/**
 * Created by wanghe on 2014/9/11.
 */
var TestEvent = "TestEvent"
var TestEventManager = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.initUI();
    },
    initUI:function(){
        cc.spriteFrameCache.addSpriteFrames(res.textureControl_plist);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("BetOneBtn.png");
        var betOneNormal = cc.Sprite.createWithSpriteFrame(spriteFrame);
        var betOneSelect = cc.Sprite.createWithSpriteFrame(spriteFrame);
        betOneSelect.setScale(0.9,0.9)
        var betOneItem = cc.MenuItemSprite.create(betOneNormal,betOneSelect,this.onBetOne.bind(this),this);

        var menu = cc.Menu.create(betOneItem);
        this.addChild(menu);

        cc.eventManager.addCustomListener(TestEvent,this.callBack.bind(this));
        cc.eventManager.addListener()
    },
    onBetOne:function(){
        cc.log("clickBetOne")
//        var myEvent = new cc.EventCustom(TestEvent);
//        cc.eventManager.dispatchEvent(myEvent);
        cc.eventManager.dispatchCustomEvent(TestEvent);
    },
    callBack: function (event) {
        cc.log("-------------------------------")
    }
})


