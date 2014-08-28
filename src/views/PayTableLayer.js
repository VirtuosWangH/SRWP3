/**
 * Created by wanghe on 2014/8/15.
 */
var PayTableLayer = cc.Layer.extend({
    size:null,
    closeBtn:null,
    touchCloseBtn:false,
    touchPage:false,
    touchBeginX:null,
    pages:null,
    pagesOriginalPos:null,
    pageWidth:null,
    pageOffsetX:60,
    currentPageIndex:null,
    isAvailableToMove:false,
    moveOffsetX:null,

    ctor:function(){
        this._super();
        this.setVisible(false);

        cc.spriteFrameCache.addSpriteFrames(res.textureAssets02_plist);

        this.createUI();
        this.setup();
    },
    createUI:function(){
        this.size = cc.director.getWinSize();

        var color = cc.color(0, 0, 0, 200);
        var bgLayer = cc.LayerColor.create(color);
        bgLayer.changeWidth(this.size.width);
        bgLayer.changeHeight(this.size.height);
        bgLayer.setOpacity(150);
        this.addChild(bgLayer);

        this.createPages();

        var spriteFrame = cc.spriteFrameCache.getSpriteFrame("button_close.png")
        this.closeBtn = cc.Sprite.createWithSpriteFrame(spriteFrame);
        var btnSize = this.closeBtn.getContentSize();
        this.closeBtn.setPosition(this.size.width-btnSize.width,this.size.height-btnSize.height);
        this.addChild(this.closeBtn);
    },
    show:function(isShow){
        if(isShow){
            this.touchCloseBtn = this.touchPage = false;
            this.touchBeginX = this.size.width/2;
            this.currentPageIndex = 0;
            this.isAvailableToMove = true;
        }
        this.setVisible(isShow);
    },
    createPages:function(){
        this.pages = cc.Layer.create();
        for (var i=0; i<4; i++) {
            var pageName = "HelpScreens_0"+(i+1)+".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(pageName);
            var page = cc.Sprite.createWithSpriteFrame(spriteFrame);
            if(this.pageWidth == null){
                this.pageWidth = page.getContentSize().width;
            }
            page.setPosition(i*(this.pageWidth+ this.pageOffsetX),0)
            this.pages.addChild(page);
        }
        this.pagesOriginalPos = cc.p(this.size.width/2,this.size.height/2+70);
        this.pages.setPosition(this.pagesOriginalPos.x,this.pagesOriginalPos.y);
        this.addChild(this.pages);
    },
    containTouchLocationOnCloseButton:function(touch){
        var getPoint = touch.getLocation();
        var contentSize  =  this.closeBtn.getContentSize();
        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRect.x = this.closeBtn.getPosition().x-contentSize.width/2;
        myRect.y = this.closeBtn.getPosition().y-contentSize.height/2;
        this.touchCloseBtn = cc.rectContainsPoint(myRect, getPoint);

        return this.touchCloseBtn;
    },
    containTouchLocationOnPages:function(touch){
        var getPoint = touch.getLocation();
        var myRect = cc.rect(20, 120, this.size.width-40, this.size.height-140);
        this.touchPage = cc.rectContainsPoint(myRect, getPoint);
        return this.touchPage;
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
    onTouchBegan:function (touch, event) {
        var target = event.getCurrentTarget();
        var isClose = target.containTouchLocationOnCloseButton(touch);
        var isMove = target.containTouchLocationOnPages(touch);
        if (isClose){
            return true;//continue touch event
        }else{
            if(isMove && target.isAvailableToMove){
                target.touchBeginX = touch.getLocation().x;
                return true;
            }else{
                return false;
            }
        }
    },
    onTouchMoved:function(touch, event){
        var target = event.getCurrentTarget();
        if(!target.touchCloseBtn){
            var touchPoint = touch.getLocation();
            if(target.moveOffsetX == null){
                target.moveOffsetX = touchPoint.x - (-target.currentPageIndex*(target.pageWidth+ target.pageOffsetX)+target.pagesOriginalPos.x);
            }
            var currentX = touchPoint.x - target.moveOffsetX;
            target.pages.setPositionX(currentX);
        }
    },
    onTouchEnded:function (touch, event) {
        var target = event.getCurrentTarget();
        if(target.touchCloseBtn){
            target.show(false);
        }
        if(target.touchPage && target.isAvailableToMove){
            target.isAvailableToMove = false;
            var touchEndX = touch.getLocation().x;
            var moveDistance = target.touchBeginX - touchEndX;
            var moveToLeft = moveDistance>0?true:false;
            var offsetX = Math.abs(moveDistance);
            if(offsetX>target.size.width/3){//move
                var targetPageIndex = target.currentPageIndex;
                if(moveToLeft){
                    if(targetPageIndex<3){
                        targetPageIndex +=1;
                    }else{
                        targetPageIndex =3;
                    }
                }else{
                    if(targetPageIndex>0){
                        targetPageIndex -=1;
                    }else{
                        targetPageIndex =0;
                    }
                }
            }else{//return back
                     targetPageIndex = target.currentPageIndex;
            }
            var targetX = -targetPageIndex*(target.pageWidth+ target.pageOffsetX)+target.pagesOriginalPos.x;
            var moveAnim = cc.MoveTo.create(1, cc.p(targetX, target.pagesOriginalPos.y));
            var easeMove = cc.EaseOut.create(moveAnim,3);
            var onComplete = cc.CallFunc.create(target.onComplete,target,targetPageIndex);
            target.pages.runAction(cc.Sequence.create(easeMove, onComplete));
        }
    },
    onComplete: function (e,targetPageIndex) {
        this.isAvailableToMove = true;
        this.currentPageIndex = targetPageIndex;
        this.moveOffsetX = null;
//        cc.log("finish"+targetPageIndex)
    }
})