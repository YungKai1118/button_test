class Main extends egret.DisplayObjectContainer {

    private n1: number = 3; // n1*n2大小的戳戳樂
    private n2: number = 3;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }


    private onAddToStage(event: egret.Event) {
        egret.log("start");

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig('resource/game.res.json', 'resource/');


    }

    private onConfigComplete(e: RES.ResourceEvent) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadGroup('preload_w');
        RES.loadGroup('preload_p');

    }

    // private sp: egret.Sprite = new egret.Sprite();
    // private bmp: egret.Bitmap = new egret.Bitmap();
    private p: egret.BitmapData[] = [];
    private spt: egret.Sprite[] = [];
    private bmpt: egret.Bitmap[] = [];
    private onGroupComplete() {
        this.p[0] = RES.getRes('p5_png'); //尚未戳
        this.p[1] = RES.getRes('p6_png'); //沒中獎
        this.p[2] = RES.getRes('w4_png'); //中獎
        let count: number = 0;

        // this.bmpt[0] = new egret.Bitmap();
        // this.bmpt[0].bitmapData = this.p[0];
        // egret.log(this.bmpt[0].width);

        for (let i = 0; i < this.n1; i++) {
            for (let t = 0; t < this.n2; t++) {
                this.bmpt[count] = new egret.Bitmap();
                this.spt[count] = new egret.Sprite();
                this.bmpt[count].bitmapData = this.p[0];
                this.spt[count].addChild(this.bmpt[count]);
                this.spt[count].x = this.bmpt[count].width * i + 10 * i;
                this.spt[count].y = this.bmpt[count].height * t + 10 * t;
                this.addChild(this.spt[count]);
                this.spt[count].touchEnabled = true;
                this.spt[count].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                count++;
            }
        }
    }


    private onTouch (e:egret.TouchEvent):void{
        egret.log(this.bmpt);
    }
}

