/**
 * Created by wanghe on 2014/8/29.
 */
var SoundManger = cc.Class.extend({
    soundManger:null,
    spinNum:0,
    ctor:function() {
        this.init();
    },
    init:function(){
        this.soundManger = cc.audioEngine;
    },
    playMusic:function(sound, isLoop){
//        cc.log("---playMusic---")
        this.soundManger.playMusic(sound, isLoop);
    },
    playEffect:function(sound, isLoop){
//        cc.log("---playEffect---")
        if(sound == "spin"){
            var index = this.spinNum%6;
            var sound = "res/sounds/spin_"+index+".mp3"
            this.soundManger.playEffect(sound, isLoop);
            this.spinNum +=1;
        }else{
            this.soundManger.playEffect(sound, isLoop);
        }
    }
})
SoundManger.instance = null;
SoundManger.getInstance = function(){
    if(!SoundManger.instance){
        SoundManger.instance = new SoundManger();
    }
    return SoundManger.instance;
}