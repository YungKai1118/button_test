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

        this.random_winnumber = this.random_n();

        ////TEST CODE ------------------------------------------↓
        let arr2 = [54, 9, 30,];
        arr2.sort(function () { return 0.5 })
        // arr2.sort(function () {//隨機打亂這個陣列
        //     return Math.random() - 0.5;
        // })
        console.log("test : " + arr2);
        ////TEST CODE ------------------------------------------↑
    }

    private group_list: string[] = ['preload_w', 'preload_p'];
    private onConfigComplete(e: RES.ResourceEvent) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        for (let i: number = 0; i < this.group_list.length; ++i) {
            RES.loadGroup(this.group_list[i]);
        }
        // this.group_list.forEach((v) => {
        //     RES.loadGroup(v);
        // }, this);

    }

    // private sp: egret.Sprite = new egret.Sprite();
    // private bmp: egret.Bitmap = new egret.Bitmap();

    private onGroupComplete(e: RES.ResourceEvent) {

        let idx: number = this.group_list.indexOf(e.groupName);
        this.group_list.splice(idx, 1);

        //全部資源OK才初始化
        if (this.group_list.length == 0) {
            this.p[0] = RES.getRes('p5_png'); //尚未戳
            this.p[1] = RES.getRes('p6_png'); //沒中獎
            this.p[2] = RES.getRes('w4_png'); //中獎

            //THEME---------------------------------------------------------------------------------
            this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
            this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            let theme = new eui.Theme(`resource/default.thm.json?v=${new Date().getTime()}`, this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, (e: eui.UIEvent) => {
                this.init();
            }, this);
        }
    }

    private p: egret.BitmapData[] = [];
    private spt: KaiSprite[] = [];
    private bmpt: egret.Bitmap[] = [];

    private init() {
        // let gameScene: GameScene = new GameScene();
        // gameScene.skinName = "GameSceneSkin";
        // this.addChild(gameScene);

        // return;
        
        let s: egret.Shape = new egret.Shape();
        s.graphics.beginFill(0x0, 1);
        s.graphics.drawRect(0, 0, 100, 100);
        s.graphics.endFill();
        this.addChild(s);

        let count: number = 0;
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

    private random_n(): number[] {
        let t1 = this.n1 * this.n2       //全部格子數
        this.w1 = Math.round(t1 * 0.2);  //中獎圖個數
        let arr1: number[] = Array();
        for (let i = 0; i < t1; i++) {//一個從0到 t1-1 的陣列， 共t1個數字
            arr1.push(i);
        }
        arr1.sort(function () {//隨機打亂這個陣列
            return Math.random() - 0.5;
        })
        arr1.length = this.w1;//改寫長度，剩下中獎個數資料
        console.log(arr1);//輸出 w1 個不同的數
        return arr1;


        // let tempn: number[] = new Array();    //使用下列方法會產生同樣的隨機數，不使用

        // for (let i = 0; i < this.w1; i++) {
        //     tempn[i] = Math.round(Math.random() * (t1 - 1)); //0~t1-1
        //     egret.log(tempn[i]);
        // }

        // return tempn;
    }

    private onTouch(e: egret.TouchEvent): void {
        let sp: KaiSprite = e.currentTarget;
        let nn: number = sp.count;                //被點擊圖形是資料陣列中第nn個,由0~nn-1
        // let count: number = parseInt(sp.name);//1  ,使用name方式記錄(後來採用class方式抓取資料)
        // let count: number = parseInt(sp.name.substr(3));//2 sp_#
        let win_cheack: boolean = false;
        for (let i = 0; i < this.random_winnumber.length; i++) {

            if (this.random_winnumber[i] == nn) {
                this.bmpt[nn].bitmapData = this.p[2];
                win_cheack = true;
            }
            else if (win_cheack == false) {
                this.bmpt[nn].bitmapData = this.p[1];
            }
        }


    }
}

