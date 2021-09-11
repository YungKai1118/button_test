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

    private b: egret.Shape;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        egret.log("AA");

        let c: egret.Sprite = new egret.Sprite();
        c.graphics.beginFill(0x0, 1);
        c.graphics.drawRect(0, 0, 500, 500);
        c.graphics.endFill();
        this.addChild(c);

        egret.log("A");
        //色塊(紅)
        let a: egret.Shape = new egret.Shape();
        a.graphics.beginFill(0xff0000, 1);
        a.graphics.drawCircle(0, 0, 50);
        a.graphics.endFill();
        this.addChild(a);
        a.x = 100;
        a.y = 100;
        a.touchEnabled = true;
        a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);

        //色塊(綠)
        this.b = new egret.Shape();
        this.b.graphics.beginFill(0x00ff00, 1);
        this.b.graphics.drawCircle(0, 0, 50);
        this.b.graphics.endFill();
        this.addChild(this.b);
        this.b.x = 200;
        this.b.y = 200;
    }



    private onClickButton(): void {
        egret.log("click");
        this.b.x += 50;
    }
}


