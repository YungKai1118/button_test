
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private sp1: egret.Sprite = new egret.Sprite();
    private sp2: egret.Sprite = new egret.Sprite();

    private onAddToStage(event: egret.Event) {
        egret.log("start");

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig('resource/game.res.json', 'resource/');

        //將sp1和sp2放置舞台上
        this.addChild(this.sp1);
        this.addChild(this.sp2);

        //頻率移動sp1
        this.stage.frameRate = 30;
        this.addEventListener(egret.Event.ENTER_FRAME, this.move, this);
    }


    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadGroup('preload_w');
        // RES.loadGroup('preload_p');
    }

    public bmp1: egret.Bitmap = new egret.Bitmap();
    private bmp2: egret.Bitmap = new egret.Bitmap();

    private onGroupComplete(event: RES.ResourceEvent): void {
        egret.log('group complete');

        let w1: egret.BitmapData = RES.getRes('w1_png');
        this.bmp1.bitmapData = w1;
        this.sp1.addChild(new egret.Bitmap(w1));
        this.sp1.x = 0;
        this.sp1.y = 50;

        let w2: egret.BitmapData = RES.getRes('w2_png');
        this.bmp2.bitmapData = w2;
        this.sp2.addChild(this.bmp2);
        this.sp2.x = 200;
        this.sp2.touchEnabled = true;
        this.sp2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        TweenLite.to(this.bmp2, 5, { x: 400, ease: Bounce.easeIn });

    }

    //移動

    private move(event: egret.Event) {

        if (this.isStart == true) {
            if (this.sp1.y < 50 + this.bmp1.height * 3) {
                this.sp1.y += 5;
            }
            else {
                this.sp1.y = 150;
            }
        }

    }

    private isStart: boolean = false;
    private touchHandler(event: egret.TouchEvent) {
        this.sp2.touchEnabled = false;
        if (this.isStart == false) {
            this.isStart = true;
            egret.log("event type" + event.type);
            this.sp1.x += 50;
            if (this.sp1.x > 400) {
                this.sp2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            }
        }
    }
}
