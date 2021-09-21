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

    //1
    private onAddToStage(event: egret.Event) {
        egret.log("pr.start");

        this.addChild(this.sp1);
        this.sp1.touchEnabled = true;
        this.sp1.graphics.beginFill(0xff0000, 1);
        this.sp1.graphics.drawRect(0, 0, 100, 100);
        this.sp1.graphics.endFill();

        this.addChild(this.sp2);
        this.sp2.graphics.beginFill(0x00ff00, 1);
        this.sp2.graphics.drawRect(0, 0, 100, 100);
        this.sp2.graphics.endFill();
        this.sp2.x = 300;
        this.sp2.touchEnabled = true;

        //容器
        let a: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();

        //先掛監聽器
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        //開始讀取(配置檔)
        RES.loadConfig('resource/game.res.json', 'resource/');
    }

    //2
    private onConfigComplete(event: RES.ResourceEvent): void {

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);

        //讀哪個群組
        RES.loadGroup('preload');
    }

    private myBmp1: egret.Bitmap = new egret.Bitmap();
    private sp1: egret.Sprite = new egret.Sprite();
    private sp2: egret.Sprite = new egret.Sprite();

    //3
    private onGroupComplete(event: RES.ResourceEvent): void {
        egret.log("group complete");

        let bmpData: egret.BitmapData = RES.getRes('bg_png');
        this.myBmp1.bitmapData = bmpData;
        this.myBmp1.alpha = 0.5;
        this.sp1.addChild(this.myBmp1);
        this.myBmp1.x = 150;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.test, this);
    }

    private test(event: egret.TouchEvent): void {
        this.sp2.addChild(this.myBmp1);
    }
}


