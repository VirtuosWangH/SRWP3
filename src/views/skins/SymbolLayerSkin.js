/**
 * Created by wanghe on 2014/9/24.
 */
var SymbolLayerSkin = cc.Class.extend({

})
SymbolLayerSkin.symbolResults = [
    [[1,2,3,4,5],
        [1,2,3,4,5],
        [1,2,3,4,5],
        [7,7,7,7,7],
        [1,2,3,4,5],
        [1,2,3,4,5]],

    [[1,2,3,4,5],
        [1,2,3,4,5],
        [1,2,3,4,5],
        [8,8,8,8,8],
        [1,2,3,4,5],
        [1,2,3,4,5]],

    [[1,2,3,4,5],
        [1,2,3,4,5],
        [1,2,3,4,5],
        [9,9,9,9,1],
        [1,2,3,4,5],
        [1,2,3,4,5]],

    [[1,2,3,4,5],
        [1,2,3,4,5],
        [5,4,3,2,1],
        [5,4,3,2,1],
        [1,2,3,4,5],
        [1,2,3,4,5]],

    [[1,2,3,4,5],
        [1,2,3,4,5],
        [7,8,3,2,1],
        [5,4,9,2,1],
        [1,2,3,6,5],
        [1,2,3,4,5]],

    [[1,2,3,4,5],
        [1,2,3,4,5],
        [5,8,3,2,7],
        [5,4,6,2,1],
        [6,2,3,6,5],
        [1,2,3,4,5]],

    [[1,2,3,4,5],
        [1,2,3,4,7],
        [9,7,3,2,1],
        [6,4,9,2,1],
        [1,2,3,6,5],
        [1,2,3,4,5]]
]
SymbolLayerSkin.getRandomSymbolFrame = function(){
    var tempNum = Math.ceil(Math.random()*12);
    var num = tempNum>9?tempNum:"0"+tempNum;
    var symbolName = "Symbol_"+num+".png";
    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(symbolName);
    return spriteFrame;
}
SymbolLayerSkin.getBlurRandomSymbolFrame = function(){
    var tempNum = Math.ceil(Math.random()*12);
    var num = tempNum>9?tempNum:"0"+tempNum;
    var symbolName = "blur_Symbol_"+num+".png";
    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(symbolName);
    return spriteFrame;
}
SymbolLayerSkin.getFrameByIndex = function(index){
    var frame = cc.spriteFrameCache.getSpriteFrame("Symbol_0"+index+".png");
    return frame;
}
