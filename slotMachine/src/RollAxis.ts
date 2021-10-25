class RollAxis extends eui.Component {

    private p0: eui.Image; p0_FirstY: number;  //第一張圖片; 第一章圖片位置
    private p1: eui.Image; p1_FirstY: number;
    private p2: eui.Image; p2_FirstY: number;
    private temp_p0: any;//佔存圖片，供換圖使用

    private image_list: eui.Image[];//所有圖片資源
    private numberOfImages: number = 5;

    private totalRollTimes: number = 15;//轉動次數，數字越大轉動越久
    private RollSpeed: number = 0.6;//轉動初始速度，數字越小越快

    private timer: egret.Timer;
    private LastImageNumber: number;

    public static "ON_COMPLETE": string = "RollAxis.ON_COMPLETE"

    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)
    }

    private uiComplete(e: eui.UIEvent): void {
        egret.log("RollAxisCom")

        this.image_list = [];
        for (let i = 0; i < this.numberOfImages; i++) {
            this.image_list.push(RES.getRes(`p${i}_png`))
        }
        this.p0_FirstY = this.p0.y;
        this.p1_FirstY = this.p1.y;
        this.p2_FirstY = this.p2.y;
    }

    /**
     * 每次點擊開始按鈕後初始化參數
     */
    private Speed_temp: number;
    private IsFirstRoll: boolean;
    private countRollTimes: number;
    public init(_n) { //獲取中獎圖片編號
        this.LastImageNumber = _n;
        this.Speed_temp = this.RollSpeed;
        this.IsFirstRoll = true;
        this.countRollTimes = 0;
    }

    public RollAxis(): void {
        //twennLite 動圖
        if (this.IsFirstRoll) {  //第二次開始執行遊戲的圖片起點位置為前次結束位置，不先動圖，先把第一張圖片換掉
            this.IsFirstRoll = false;
            // this.randomeP();
            TweenLite.to(this, 0.1, { onComplete: this.randomeP, onCompleteScope: this }); //執行完else面的存圖，才可以呼叫randomeP
        }
        else {
            TweenLite.to(this.p0, this.Speed_temp, { y: this.p0.y + this.height / 4 * 2, ease: Linear.easeNone });
            TweenLite.to(this.p1, this.Speed_temp, { y: this.p1.y + this.height / 4 * 2, ease: Linear.easeNone });
            TweenLite.to(this.p2, this.Speed_temp, { y: this.p2.y + this.height / 4 * 2, ease: Linear.easeNone });
            TweenLite.to(this.p0, this.Speed_temp, { alpha: 1, onComplete: this.randomeP, onCompleteScope: this });
            //轉動次數計次
            this.countRollTimes++;
        }
        this.temp_p0 = this.p0.texture;
        //控制轉動速度
        if (this.countRollTimes <= Math.floor(this.totalRollTimes / 4) && this.Speed_temp > 0) {
            this.Speed_temp -= 0.08;
        }
        else if (this.countRollTimes >= this.totalRollTimes - Math.floor(this.totalRollTimes / 4)) {
            this.Speed_temp += 0.08;
        }
    }

    public randomeP(): void {  //Q? 這裡用前面的function回傳值會爆掉
        // this.p0.texture = this.image_list[0].texture;  //Q? 不可以? 
        this.p0.texture = RES.getRes(`p${Math.floor(Math.random() * 4)}_png`);
        this.p1.texture = RES.getRes(`p${Math.floor(Math.random() * 4)}_png`);
        this.p2.texture = this.temp_p0;
        this.p0.y = this.p0_FirstY;
        this.p1.y = this.p1_FirstY;
        this.p2.y = this.p2_FirstY;
        if (this.countRollTimes == this.totalRollTimes) {
            this.RollEnd();
        }
        else {
            this.RollAxis();
        }

        /**
         * 學習測試code
         */
        // this.tweenLiteMove();
        // egret.Tween.get(this.p0, { loop: true })
        //     .to({ y: this.p0.y + this.height / 4 * 2  }, 2000)
        //     .call(this.tweenLiteMove).wait(2000)  //????不知道怎麼用

        // this.image_list[0]=this.p0;
        // this.p2=this.image_list[0];   //Q 為什麼不能這樣改p2的圖?????  是call by reference? 

    }

    private RollEnd(): void {
        // this.endImageNumber=4;  
        this.p0.texture = RES.getRes(`p${this.LastImageNumber}_png`);
        TweenLite.to(this.p0, 1.3, { y: this.p0.y + this.height / 4 * 2, ease: Circ });
        TweenLite.to(this.p1, 1.3, { y: this.p1.y + this.height / 4 * 2, ease: Circ });
        TweenLite.to(this.p2, 1.3, { y: this.p2.y + this.height / 4 * 2, ease: Circ });

        TweenLite.to(this.p0, 1.3 + 0.1, { alpha: 1, onComplete: this.ON_COMPLETE, onCompleteScope: this });
        this.Speed_temp = this.RollSpeed;
    }

    private ON_COMPLETE(): void {
        this.dispatchEventWith(RollAxis.ON_COMPLETE, true, true);
    }
}
