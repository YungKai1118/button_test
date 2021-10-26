class RollAxis extends eui.Component {

    private p0: eui.Image; p0_FirstY: number;  //第一張圖片; 第一章圖片位置
    private p1: eui.Image; p1_FirstY: number;
    private p2: eui.Image; p2_FirstY: number;
    private images: eui.Group; images_FirstY: number;
    private temp_p0: any;//佔存圖片，供換圖使用

    private image_list: egret.Texture[];//所有圖片資源
    private numberOfImages: number = 5;

    private totalRollTimes: number = 18;//轉動次數，數字越大轉動越久
    private rollSpeed: number = 0.65;//轉動初始速度，數字越小越快

    private timer: egret.Timer;
    private lastImageNumber: number;

    public static COMPLETE: string = "RollAxis.COMPLETE"

    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)
    }

    private uiComplete(e: eui.UIEvent): void {
        egret.log("RollAxisCom")

        this.image_list = [];
        for (let i = 0; i < this.numberOfImages; i++) {
            //method 1
            this.image_list.push(<egret.Texture>RES.getRes(`p${i}_png`))
            ////method 2
            // this.image_list.push(RES.getRes(`p${i}_png`) as egret.Texture) 
        }
        this.p0_FirstY = this.p0.y;
        this.p1_FirstY = this.p1.y;
        this.p2_FirstY = this.p2.y;
        this.images_FirstY = this.images.y;
    }

    /**
     * 點擊開始按鈕後初始化參數
     * 1.獲取最後一張圖片
     * 2.動畫速度參數初始化
     * 3.轉動次數初始化
     */
    private tempSpeed: number;
    private countRollTimes: number;
    public init(imageNumber: number) { //獲取中獎圖片編號
        this.lastImageNumber = imageNumber;
        this.tempSpeed = this.rollSpeed;
        this.countRollTimes = 0;
    }

    /**
     * 旋轉範例 (這個程式用不到，留存學習)
     */
    // public RollAxis(): void {
    //     TweenLite.to(this.p2, 3, { rotation: 360, ease: Linear.easeNone });
    // }


    public rollAxis(): void {
        // twennLite 動圖
        ////method 1 :每個物件都動  (後面程式碼已刪除，無法使用，留存學習)
        // TweenLite.to(this.p0, this.Speed_temp, { y: this.p0.y + this.height / 4 * 2, ease: Linear.easeNone });
        // TweenLite.to(this.p1, this.Speed_temp, { y: this.p1.y + this.height / 4 * 2, ease: Linear.easeNone });
        // TweenLite.to(this.p2, this.Speed_temp, { y: this.p2.y + this.height / 4 * 2, ease: Linear.easeNone });
        // TweenLite.to(this.images, this.Speed_temp, { alpha: 1, onComplete: this.randomeP, onCompleteScope: this });
        ////method 2 :使用群組動
        TweenLite.to(this.images, this.tempSpeed, { y: this.images.y + this.images.height / 3 * 2, ease: Linear.easeNone, onComplete: this.randomeP, onCompleteScope: this });

        //轉動次數計次
        this.countRollTimes++;
        this.temp_p0 = this.p0.texture;
        //控制轉動速度
        if (this.countRollTimes <= Math.floor(this.totalRollTimes / 4) && this.tempSpeed > 0) {
            this.tempSpeed -= 0.08;
        }
        else if (this.countRollTimes >= this.totalRollTimes - Math.floor(this.totalRollTimes / 4)) {
            this.tempSpeed += 0.08;
        }
    }

    private randomeP(): void {  //Q? 這裡用前面的function回傳值會爆掉
        //method 1 :由先行儲存資料列讀取
        this.p0.texture = this.image_list[Math.floor(Math.random() * 4)];
        this.p1.texture = this.image_list[Math.floor(Math.random() * 4)];
        ////method 2 :由資料庫讀取
        // this.p0.texture = RES.getRes(`p${Math.floor(Math.random() * 4)}_png`);
        // this.p1.texture = RES.getRes(`p${Math.floor(Math.random() * 4)}_png`);

        //第二次轉動圖片接續使用
        this.p2.texture = this.temp_p0;

        //第二次轉動回復圖片原始位置
        this.images.y = this.images_FirstY;

        //判斷轉動是否應該結束
        if (this.countRollTimes == this.totalRollTimes) {
            this.rollEnd();
        }
        else {
            this.rollAxis();
        }
    }

    private rollEnd(): void {
        //最後一張圖片
        this.p0.texture = RES.getRes(`p${this.lastImageNumber}_png`);
        //最後一次移動動畫
        TweenLite.to(this.images, 1, { y: this.images.y + this.images.height / 3 * 2, ease: Linear.easeNone, onComplete: this.rollComplete, onCompleteScope: this });
        //初始化第一張圖片
        this.temp_p0 = this.p0.texture;
        //初始化初始速度，供下次轉動使用
        this.tempSpeed = this.rollSpeed;
    }

    private rollComplete(v1: number, v2: number): void {
        //轉動動畫結束事件發佈
        this.dispatchEventWith(RollAxis.COMPLETE, true, true);
        //初始化第一張圖片
        this.p2.texture = this.temp_p0;
        //初始化圖片位置至最初狀態
        this.images.y = this.images_FirstY;
    }
}
