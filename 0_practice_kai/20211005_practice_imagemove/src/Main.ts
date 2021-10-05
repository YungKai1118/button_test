
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        egret.log("start");

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig('resource/game.res.json', 'resource/');

    }


    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadGroup('preload_w');
        RES.loadGroup('preload_p');
    }


    private p: egret.BitmapData[] = [];
    private onGroupComplete(event: RES.ResourceEvent): void {
        egret.log('group complete');

        this.p[0] = RES.getRes('w1_png');
        this.p[1] = RES.getRes('w2_png');

        this.init();
    }


    private sp: egret.Sprite[] = [];
    private bmp: egret.Bitmap[] = [];
    private init() {
        this.bmp[0] = new egret.Bitmap();
        this.sp[0] = new egret.Sprite();
        this.bmp[0].bitmapData = this.p[0];
        this.sp[0].addChild(this.bmp[0]);
        this.sp[0].x = 0;
        this.sp[0].y = 0;
        this.addChild(this.sp[0]);

        this.bmp[1] = new egret.Bitmap();
        this.sp[1] = new egret.Sprite();
        this.bmp[1].bitmapData = this.p[1];
        this.sp[1].addChild(this.bmp[1]);
        this.sp[1].x = 0;
        // this.sp[1].y = 150;
        this.sp[1].y = this.bmp[0].height;
        this.addChild(this.sp[1]);

        this.tweenlitemove();
    }

    private tweenlitemove() {

        let yy: number = 0;
        if (yy == 0) {
            TweenLite.to(this.bmp[0], 5, { y: this.bmp[0].height * 3 })
        }





    }
}
