var beginTime;
cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(1024, 723, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    this.beginTime = Date.now();
//    cc.log("beginTimeTime========"+this.beginTime)
//    cc._loaderImage="res/assets/assets01/symbolMask.png"//set customer loader image or over write the loaderScene
    cc.LoaderScene.preload(g_resources, function () {
//        cc.director.runScene(new HelloWorldScene());
        cc.director.runScene(new GameScene());
        var loadingTime = Date.now()-this.beginTime;
//        cc.log("loadingTime=========="+loadingTime);
    }.bind(this), this);
}.bind(this);
cc.game.run();
//just save for project.json
//"modules" : ["labels","menus","transitions","audio","clipping-nodes"],
//"modules" : ["cocos2d"],