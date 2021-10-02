class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private sp1: egret.Sprite = new egret.Sprite();
    private sp2: egret.Sprite = new egret.Sprite();
    private sp3: egret.Sprite = new egret.Sprite();
    private sp4: egret.Sprite = new egret.Sprite();
    private sp5: egret.Sprite = new egret.Sprite();
    private sp6: egret.Sprite = new egret.Sprite();
    private sp7: egret.Sprite = new egret.Sprite();
    private sp8: egret.Sprite = new egret.Sprite();
    private sp9: egret.Sprite = new egret.Sprite();
    private sp_total: egret.Sprite[] = [];

    private onAddToStage(event: egret.Event) {
        egret.log("start");

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig('resource/game.res.json', 'resource/');

        //將未戳洞前圖片放置於 ３＊３內　共９個位置中
        this.sp_total[0] = this.sp1;
        this.sp_total[1] = this.sp2;
        this.sp_total[2] = this.sp3;
        this.sp_total[3] = this.sp4;
        this.sp_total[4] = this.sp5;
        this.sp_total[5] = this.sp6;
        this.sp_total[6] = this.sp7;
        this.sp_total[7] = this.sp8;
        this.sp_total[8] = this.sp9;
        this.bmp_total[0] = this.bmp1;
        this.bmp_total[1] = this.bmp2;
        this.bmp_total[2] = this.bmp3;
        this.bmp_total[3] = this.bmp4;
        this.bmp_total[4] = this.bmp5;
        this.bmp_total[5] = this.bmp6;
        this.bmp_total[6] = this.bmp7;
        this.bmp_total[7] = this.bmp8;
        this.bmp_total[8] = this.bmp9;

        // for (let i = 0; i < 9; i++) {
        //     // egret.log(this.sp_total[i]);
        //     this.addChild(this.sp_total[i]);
        //     this.sp_total[i].touchEnabled = true;
        //     this.sp_total[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        // }

        this.random1();

    }

    private count: number = 0;
    private onConfigComplete(e: RES.ResourceEvent) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadGroup('preload_w');
        RES.loadGroup('preload_p');
        // this.count = this.count++;
        // egret.log("onConfigComplete thimes : " + (++this.count));
    }



    private bmp1: egret.Bitmap = new egret.Bitmap();
    private bmp2: egret.Bitmap = new egret.Bitmap();
    private bmp3: egret.Bitmap = new egret.Bitmap();
    private bmp4: egret.Bitmap = new egret.Bitmap();
    private bmp5: egret.Bitmap = new egret.Bitmap();
    private bmp6: egret.Bitmap = new egret.Bitmap();
    private bmp7: egret.Bitmap = new egret.Bitmap();
    private bmp8: egret.Bitmap = new egret.Bitmap();
    private bmp9: egret.Bitmap = new egret.Bitmap();
    private bmp_total: egret.Bitmap[] = [];
    private p: egret.BitmapData[] = [];


    private onGroupComplete() {
        this.p[0] = RES.getRes('p5_png');
        this.p[1] = RES.getRes('p6_png');
        this.p[2] = RES.getRes('w4_png');

        this.bmp1.bitmapData = this.p[0];
        this.sp1.addChild(this.bmp1);
        this.sp1.x = 0;
        this.sp1.y = 0;
        this.addChild(this.sp1);
        this.sp1.touchEnabled = true;
        this.sp1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch1, this);

        this.bmp2.bitmapData = this.p[0];
        this.sp2.addChild(this.bmp2);
        this.sp2.x = 150;
        this.sp2.y = 0;
        this.addChild(this.sp2);
        this.sp2.touchEnabled = true;
        this.sp2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch2, this);

        this.bmp3.bitmapData = this.p[0];
        this.sp3.addChild(this.bmp3);
        this.sp3.x = 300;
        this.sp3.y = 0;
        this.addChild(this.sp3);
        this.sp3.touchEnabled = true;
        this.sp3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch3, this);

        this.bmp4.bitmapData = this.p[0];
        this.sp4.addChild(this.bmp4);
        this.sp4.x = 0;
        this.sp4.y = 150;
        this.addChild(this.sp4);
        this.sp4.touchEnabled = true;
        this.sp4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch4, this);

        this.bmp5.bitmapData = this.p[0];
        this.sp5.addChild(this.bmp5);
        this.sp5.x = 150;
        this.sp5.y = 150;
        this.addChild(this.sp5);
        this.sp5.touchEnabled = true;
        this.sp5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch5, this);

        this.bmp6.bitmapData = this.p[0];
        this.sp6.addChild(this.bmp6);
        this.sp6.x = 300;
        this.sp6.y = 150;
        this.addChild(this.sp6);
        this.sp6.touchEnabled = true;
        this.sp6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch6, this);

        this.bmp7.bitmapData = this.p[0];
        this.sp7.addChild(this.bmp7);
        this.sp7.x = 0;
        this.sp7.y = 300;
        this.addChild(this.sp7);
        this.sp7.touchEnabled = true;
        this.sp7.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch7, this);

        this.bmp8.bitmapData = this.p[0];
        this.sp8.addChild(this.bmp8);
        this.sp8.x = 150;
        this.sp8.y = 300;
        this.addChild(this.sp8);
        this.sp8.touchEnabled = true;
        this.sp8.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch8, this);

        this.bmp9.bitmapData = this.p[0];
        this.sp9.addChild(this.bmp9);
        this.sp9.x = 300;
        this.sp9.y = 300;
        this.addChild(this.sp9);
        this.sp9.touchEnabled = true;
        this.sp9.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch9, this);


        // ??為什麼不能放在這裡存sp_total的檔案
        // this.sp_total[0] = this.sp1;
        // this.sp_total[1] = this.sp2;
        // this.sp_total[2] = this.sp3;
        // this.sp_total[3] = this.sp4;
        // this.sp_total[4] = this.sp5;
        // this.sp_total[5] = this.sp6;
        // this.sp_total[6] = this.sp7;
        // this.sp_total[7] = this.sp8;
        // this.sp_total[8] = this.sp9;

        // for (let i = 0; i < 9; i++) {
        //     egret.log("in on group complete" + this.sp_total[i]);
        //     // this.addChild(this.sp_total[i]);
        // }

    }
    private tempn1: number;
    private random1(): number {

        this.tempn1 = Math.round(Math.random() * 8)+1;
        egret.log(this.tempn1);
        return this.tempn1;
    }

    private ontouch1(e: egret.TouchEvent): void {
        if (this.tempn1 == 1) {
            this.bmp1.bitmapData = this.p[2];
        }
        else {
            this.bmp1.bitmapData = this.p[1];
        }
    }

    private ontouch2(e: egret.TouchEvent): void {
        if (this.tempn1 == 2) {
            this.bmp2.bitmapData = this.p[2];
        }
        else {
            this.bmp2.bitmapData = this.p[1];
        }
    }

    private ontouch3(e: egret.TouchEvent): void {
        if (this.tempn1 == 3) {
            this.bmp3.bitmapData = this.p[2];
        }
        else {
            this.bmp3.bitmapData = this.p[1];
        }
    }

    private ontouch4(e: egret.TouchEvent): void {
        if (this.tempn1 == 4) {
            this.bmp4.bitmapData = this.p[2];
        }
        else {
            this.bmp4.bitmapData = this.p[1];
        }
    }

    private ontouch5(e: egret.TouchEvent): void {
        if (this.tempn1 == 5) {
            this.bmp5.bitmapData = this.p[2];
        }
        else {
            this.bmp5.bitmapData = this.p[1];
        }
    }

    private ontouch6(e: egret.TouchEvent): void {
        if (this.tempn1 == 6) {
            this.bmp6.bitmapData = this.p[2];
        }
        else {
            this.bmp6.bitmapData = this.p[1];
        }

    }
    private ontouch7(e: egret.TouchEvent): void {
        if (this.tempn1 == 7) {
            this.bmp7.bitmapData = this.p[2];
        }
        else {
            this.bmp7.bitmapData = this.p[1];
        }

    }
    private ontouch8(e: egret.TouchEvent): void {
        if (this.tempn1 == 8) {
            this.bmp8.bitmapData = this.p[2];
        }
        else {
            this.bmp8.bitmapData = this.p[1];
        }
    }

    private ontouch9(e: egret.TouchEvent): void {
        if (this.tempn1 == 9) {
            this.bmp9.bitmapData = this.p[2];
        }
        else {
            this.bmp9.bitmapData = this.p[1];
        }

    }


}