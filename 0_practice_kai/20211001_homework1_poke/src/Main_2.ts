class Main2 extends egret.DisplayObjectContainer {

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

        egret.log(this.p[0]);

    }

    private onConfigComplete(e: RES.ResourceEvent) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadGroup('preload_w');
        RES.loadGroup('preload_p');

    }

    private p: egret.BitmapData[] = [];
    private onGroupComplete() {
        this.p[0] = RES.getRes('p5_png'); //尚未戳
        this.p[1] = RES.getRes('p6_png'); //沒中獎
        this.p[2] = RES.getRes('w4_png'); //中獎



    }

}