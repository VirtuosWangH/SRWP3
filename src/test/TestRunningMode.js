/**
 * Created by wanghe on 2014/9/2.
 */
var TestRunningMode = cc.Layer.extend({
    ctor: function () {
        this._super();

        this.init();
    },
    names:["2d","webgl","experimental-webgl","moz-webgl","webkit-3d"],
    init: function () {
        this._super();
        var canvas = cc._canvas;
        var isOpenGL = canvas.getContext("opengl");
        var isWebGL = canvas.getContext("webgl");
        var isMozWebGL = canvas.getContext("moz-webgl");
        var isExperimentalWebGL = canvas.getContext("experimental-webgl");

        cc.log("isOpenGL="+isOpenGL);
        cc.log("isWebGL="+isWebGL);
        cc.log("isMozWebGL="+isMozWebGL);
        cc.log("isExperimentalWebGL="+isExperimentalWebGL);

    }
})


