cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(1024, 723, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
//    cc._loaderImage="res/assets/assets01/symbolMask.png"//set customer loader image or over write the loaderScene
    cc.LoaderScene.preload(g_resources, function () {
//        cc.director.runScene(new HelloWorldScene());
        cc.director.runScene(new GameScene());
    }, this);
};
cc.game.run();