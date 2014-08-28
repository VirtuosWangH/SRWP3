/**
 * Created by wanghe on 2014/8/13.
 */
var SymbolVO = cc.Sprite.extend({
    reelIndex:0,
    symbolIndex:0,
    symbolName:"default",

    showString:function(){
        cc.log("[SymbolVO: symbolIndex " + this.symbolIndex + ", symbolName " + this.symbolName + ", reelIndex " + this.reelIndex + "]");
    }
})
