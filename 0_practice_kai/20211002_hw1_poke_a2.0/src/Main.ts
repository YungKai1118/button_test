class Main extends egret.DisplayObjectContainer {

    private n1: number = 6; // n1*n2大小的戳戳樂
    private n2: number = 5;
    private w1: number = 0.2;  // 中獎機率 0~1  *100% 

    private random_winnumber: number[] = Array();

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }


    private onAddToStage(event: egret.Event) {
        egret.log("start");

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig('resource/game.res.json', 'resource/');

        this.random_winnumber = this.random();
    }

    private onConfigComplete(e: RES.ResourceEvent) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadGroup('preload_w');
        RES.loadGroup('preload_p');

    }

    // private sp: egret.Sprite = new egret.Sprite();
    // private bmp: egret.Bitmap = new egret.Bitmap();
    private p: egret.BitmapData[] = [];
    private spt: KaiSprite[] = [];
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
                this.spt[count] = new KaiSprite();
                this.spt[count].col = i;
                this.spt[count].row = t;
                this.spt[count].count = count;
                this.bmpt[count].bitmapData = this.p[0];
                this.spt[count].addChild(this.bmpt[count]);
                this.spt[count].x = this.bmpt[count].width * i + 10 * i;
                this.spt[count].y = this.bmpt[count].height * t + 10 * t;
                this.addChild(this.spt[count]);
                this.spt[count].touchEnabled = true;
                // this.spt[count].name = count.toString();//1
                this.spt[count].name = "sp_" + count.toString();//2  ,原本要用name找資料位置，後來用class抓count，就沒用了
                this.spt[count].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                count++;
            }
        }
    }

    private random(): number[] {
        let t1 = this.n1 * this.n2       //全部格子數
        this.w1 = Math.round(t1 * 0.2);  //中獎圖個數
        let tempn: number[] = new Array();

        for (let i = 0; i < this.w1; i++) {
            tempn[i] = Math.round(Math.random() * (t1 - 1)); //0~t1-1
            egret.log(tempn[i]);
        }

        return tempn;
    }

    private onTouch(e: egret.TouchEvent): void {
        let sp: KaiSprite = e.currentTarget;
        let nn: number = sp.count;                //被點擊圖形是資料陣列中第nn個,由0~nn-1
        // let count: number = parseInt(sp.name);//1
        // let count: number = parseInt(sp.name.substr(3));//2 sp_#
        let win_cheack: boolean = false;
        for (let i = 0; i < this.random_winnumber.length; i++) {

            if (this.random_winnumber[i] == nn) {
                this.bmpt[nn].bitmapData = this.p[2];
                win_cheack=true;
            }
            else if(win_cheack==false) {
                this.bmpt[nn].bitmapData = this.p[1];
            }
        }


    }
}

