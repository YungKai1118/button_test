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

    public ray: number = 0;

    public g:egret.Sprite;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    //call by value & call by raference 20210913
    private test(): void {

        let a: number[] = [1, 2, 3];
        let b: number[] = a;
        b[0] = a[2];
        console.log(a);//15
        console.log(b);//10
    }

    private onAddToStage(event: egret.Event) {
        egret.log("pr.start");

        this.test();

    //lesson 1 Button  20210911
        let c: egret.Sprite = new egret.Sprite();
        c.graphics.beginFill(0x0, 1);
        c.graphics.drawRect(0, 0, 500, 500);
        c.graphics.endFill();
        this.addChild(c);

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
        egret.log('AAAA');

        //色塊(綠)
        this.b = new egret.Shape();
        this.b.graphics.beginFill(0x00ff00, 1);
        this.b.graphics.drawCircle(0, 0, 50);
        this.b.graphics.endFill();
        this.addChild(this.b);
        this.b.x = 200;
        this.b.y = 200;

        //////////自學_about Object--------------------↓↓↓ 20210912
        let mary = {
            callback: null,
            name: "mary",
            sayHello: function () {
                // console.log("Hello ${this.name}")
                console.log("Hello " + this.name);
                this.callback();
            },
            friends: ["Jane", "Leda"],
            getfriends: function () {
                this.friends.forEach(function (friend) {
                    console.log(this.name + "'s friend has " + this.friend)
                }, this)
            }
        }
        
        // ray _ 
        let aa: string[] = ["a", "b"];
        let obj = {};
        aa.forEach(function (friend) {
            this.ray = 11;
            egret.log("foreach times");
        }, this);


        this.ray = 10;
        //印出 mary;
        console.log(mary.name);
        egret.log(mary.name + " (egret.log)");
        //使用 [] 中刮號運算子
        const propertyNameA = "say";
        const propertyNameB = "Hello";
        // mary[propertyNameA + propertyNameB]();
        mary.callback = this.aaa;
        mary.sayHello();
        // 取出 function 後執行，印出 Hello Mary

        mary.name = "Louise";
        console.log(mary.name);
        //mary.friends = ['Jane','Leda']

        mary.getfriends()
        //////////自學--------------------↑↑↑

        let b:Circle = new Circle();
        b.aaa;
    }
    
    
    private vvv: string = "Ray";
    private vvv1: number = 456;
    private;
    public;
    protected;
    //對外權限 變數名稱 型別 值

    private aaa(): void {
        egret.log(this.name + " say hello & BBBBBBBBBBB");
    }



    private onClickButton(): void {
        egret.log("click");
        this.b.x += 10;
    }



}


