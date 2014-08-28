
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

//        this.testSwitchScene();
        this.start();
    },
    testSwitchScene:function(){
        var startItem = cc.MenuItemFont.create("Game Start",this.start,this);
        startItem.tagName = "gameStartBtn"
        var menu = cc.Menu.create(startItem);
        this.addChild(menu, 1);
    },
    start:function(sender){
        cc.log("begin to switch scene");

        //load resources
        cc.LoaderScene.preload(g_resources, function () {
            var scene = new GameScene();
            cc.director.runScene(scene);
        }, this);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

