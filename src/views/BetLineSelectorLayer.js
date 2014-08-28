/**
 * Created by wanghe on 2014/8/19.
 */
var BetLineSelectorLayer = cc.Layer.extend({
    size:null,
    curScene:null,
    startX:50,
    startY:175,
    endY:592,
    leftSlider:null,
    rightSlider:null,
    currentSlider:null,
    isAvailableToMove:true,
    currentBetLine:50,

    ctor: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.textureTablet_plist,res.textureTablet_png);
//        this.setTag("BetLineSelector");
        this.createUI();
        this.currentSlider = this.leftSlider;
        this.setup();
    },
    createUI:function(){
        var size = cc.director.getWinSize();
        this.size = size;
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("baseUI/Slider_track.png");
        var leftBg = cc.Sprite.createWithSpriteFrame(spriteFrame);
        leftBg.setPosition(this.startX,size.height/2)
        this.addChild(leftBg);

        spriteFrame = cc.spriteFrameCache.getSpriteFrame("baseUI/Slider_track.png");
        var rightBg = cc.Sprite.createWithSpriteFrame(spriteFrame);
        rightBg.setPosition(size.width-this.startX,leftBg.getPosition().y);
        this.addChild(rightBg);

        spriteFrame = cc.spriteFrameCache.getSpriteFrame("baseUI/Slider_ball.png");
        this.leftSlider = cc.Sprite.createWithSpriteFrame(spriteFrame);
        this.leftSlider.setPosition(this.startX,this.endY);
        this.addChild(this.leftSlider);

        var numTF = cc.LabelTTF.create("50",null,30,cc.size(30,30), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        numTF.setPosition(30,40);
        numTF.setName("LNumber");
        this.leftSlider.addChild(numTF);

        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("baseUI/Slider_ball.png");
        this.rightSlider = cc.Sprite.createWithSpriteFrame(spriteFrame);
        this.rightSlider.setPosition(size.width-this.startX,this.endY);
        this.addChild(this.rightSlider);

        var numRTF = cc.LabelTTF.create("50",null,30,cc.size(30,30), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        numRTF.setPosition(30,40);
        numRTF.setName("RNumber");
        this.rightSlider.addChild(numRTF);
    },
    containTouchLocationSlider:function(touch,target){
        var getPoint = touch.getLocation();
        var contentSize  =  target.currentSlider.getContentSize();
        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRect.x = target.currentSlider.x-contentSize.width/2;
        myRect.y = target.currentSlider.y-contentSize.height/2;

        var myRectR = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRectR.x = target.rightSlider.x-contentSize.width/2;
        myRectR.y = target.rightSlider.y-contentSize.height/2;
        var startMove = false;
        var LMove = cc.rectContainsPoint(myRect, getPoint);
        var RMove = cc.rectContainsPoint(myRectR, getPoint);
        if(LMove || RMove){
            startMove = true;
        }
        return startMove;
    },
    setMoveState:function(canMove){
        this.isAvailableToMove = canMove;
    },
    setup:function(){
        cc.eventManager.addListener(
            cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }),this)
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var isMove = target.containTouchLocationSlider(touch,target);
        cc.log("---isMove="+isMove);
        if (isMove && target.isAvailableToMove) {
            return true;
        } else {
            return false;
        }
    },
    onTouchMoved: function (touch, event) {
        cc.log("---move---");
        var target = event.getCurrentTarget();
        var touchPoint = touch.getLocation();
        var touchY = touchPoint.y;
        var targetY = 0;
        if (touchY < target.startY) {
            targetY = target.startY;
        } else if (touchY > target.endY) {
            targetY = target.endY;
        } else {
            targetY = touchY;
        }
        target.leftSlider.setPositionY(targetY);
        target.rightSlider.setPositionY(targetY);

        var allDistance = target.endY - target.startY;
        var everyDistance = allDistance / 50;
        var slideDistance = targetY - target.startY;
        var currentBetNum;
        if (slideDistance <= everyDistance) {
            currentBetNum = 1
        } else {
            currentBetNum = Math.ceil(slideDistance / everyDistance);
        }
        target.leftSlider.getChildByName("LNumber").setString(currentBetNum);
        target.rightSlider.getChildByName("RNumber").setString(currentBetNum);

        if (target.currentBetLine != currentBetNum) {
            target.currentBetLine = currentBetNum;
            target.curScene.betLineChange(currentBetNum);
        }
    },
    onTouchEnded: function (touch, event) {
        cc.log("===========");
    },
    updateBetLine:function(num){
        var allDistance = this.endY - this.startY;
        var everyDistance = allDistance/50;
        var targetY;
        if(num<2){
            targetY = this.startY;
        }else{
            targetY = num*everyDistance+this.startY;
        }

        this.leftSlider.setPosition(this.startX,targetY);
        this.rightSlider.setPosition(this.size.width-this.startX,targetY);
        this.leftSlider.getChildByName("LNumber").setString(num);
        this.rightSlider.getChildByName("RNumber").setString(num);
    }
})