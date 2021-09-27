//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
  
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private sp1:egret.Sprite=new egret.Sprite(); 
    private sp2:egret.Sprite=new egret.Sprite(); 

    private onAddToStage(event: egret.Event) {
        egret.log("start");

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig('resource/game.res.json', 'resource/');

        //將sp1和sp2放置舞台上
        this.addChild(this.sp1);
        this.addChild(this.sp2);
        
        //頻率移動sp1
        this.stage.frameRate=30; 
        this.addEventListener(egret.Event.ENTER_FRAME,this.move,this);


    }


    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComplete,this);
        RES.loadGroup('preload_w');
        // RES.loadGroup('preload_p');
    }
    
    private bmp1:egret.Bitmap=new egret.Bitmap();
    private bmp2:egret.Bitmap=new egret.Bitmap();
    
    private onGroupComplete(event:RES.ResourceEvent):void{
        egret.log('group complete');
        
        let w1:egret.BitmapData=RES.getRes('w1_png');
        this.bmp1.bitmapData=w1;
        this.sp1.addChild(this.bmp1);
        this.sp1.x=0;

        let w2:egret.BitmapData=RES.getRes('w2_png');
        this.bmp2.bitmapData=w2;
        this.sp2.addChild(this.bmp2);
        this.sp2.x=200;
        this.sp2.touchEnabled=true;
        this.sp2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
    }
    
    //移動

    private move(event:egret.Event){
 
        if (this.sp1.x<350){
            this.sp1.x += 3;
        }
        else {
            this.sp1.x=0;
        }

    }

    private touchHandler(event:egret.TouchEvent){
        egret.log("event type" +event.type);
        this.sp1.y +=50;

        if (this.sp1.y>300){  
            this.sp2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        }
    }
}
