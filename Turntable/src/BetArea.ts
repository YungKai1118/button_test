class BetArea extends eui.Component {

    private betCoin: eui.Image;//下注幣
    private rect_0: eui.Rect;//下注區
    private rect_1: eui.Rect;
    private rect_2: eui.Rect;
    private rect_3: eui.Rect;
    private rect_4: eui.Rect;
    private rect_5: eui.Rect;
    private rect_6: eui.Rect;
    private xDistance: number;//滑鼠和betCoin中心的x軸差值
    private yDistance: number;//滑鼠和betCoin中心的y軸差值
    private numberOfBet: number = 7;//可下注區域
    public userBetNumber: number = -1;//使用者下注號碼，-1為尚未開始下注。
    private coinFirstX: number;//下注幣初始位置
    private coinFirstY: number;

    public static BET_COMPLETE: string = "BET_COMPLETE";//完成下注事件名稱

    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)
    }

    /**
     * 下注幣加入滑鼠監聽事件
     */
    private uiComplete(e: eui.UIEvent): void {
        egret.log("betAreaComplete");
        this.init();
        //下注幣初始位置
        this.coinFirstX = this.betCoin.x;
        this.coinFirstY = this.betCoin.y;

        //Q 這個監聽器為什麼沒作用?
        this.addEventListener(Turntalbe.ON_COMPLETE, this.test, this); //想要監聽轉盤結束
    }

    public init(): void {
        this.betCoin.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.betCoinTouchHandler, this);
        TweenLite.to(this.betCoin, 0.2, { x: this.coinFirstX, y: this.coinFirstY, ease: Power1.easeInOut })

    }

    private test(): void {
        egret.log("test test test test")
    }
    
    public betArearemoveEventListener(): void {
        this.betCoin.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.betCoinTouchHandler, this);
    }

    /**
     * 下注幣的滑鼠狀態控制事件
     */
    private checkCollisionResult: number[] = [];
    private tempRect: eui.Rect;
    private betCoinTouchHandler(evt: egret.TouchEvent): void {

        switch (evt.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.betCoinTouchHandler, this)
                this.betCoin.addEventListener(egret.TouchEvent.TOUCH_END, this.betCoinTouchHandler, this)
                this.xDistance = evt.stageX - this.betCoin.x;
                this.yDistance = evt.stageY - this.betCoin.y;

                break;

            case egret.TouchEvent.TOUCH_MOVE:
                this.betCoin.x = evt.stageX - this.xDistance;
                this.betCoin.y = evt.stageY - this.yDistance;

                //// Q   ??
                // let coinP: egret.Point = this.betCoin.localToGlobal(this.betCoin.x, this.betCoin.y);
                // egret.log(coinP);

                //檢查每個rect(下注區)是否和硬幣中心點碰撞
                for (let i = 0; i < this.numberOfBet; i++) {
                    this.checkCollisionResult[i] = this.checkCollision(this[`rect_${i}`], this.betCoin.x + this.x, this.betCoin.y + this.y)
                }
                break;

            case egret.TouchEvent.TOUCH_END:
                //移除move和end的監聽
                this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.betCoinTouchHandler, this)
                this.betCoin.removeEventListener(egret.TouchEvent.TOUCH_END, this.betCoinTouchHandler, this)

                egret.log("userBetNumber = " + (this.checkCollisionResult.indexOf(1) + 1));
                //獲得使用者下注號碼，若沒有下注為-1
                this.userBetNumber = this.checkCollisionResult.indexOf(1);
                //滑鼠點擊結束展示硬幣緩動
                if (this.userBetNumber != -1) {//在下注區內，移至下注區rect_中心點
                    this.tempRect = this[`rect_${this.userBetNumber}`];
                    TweenLite.to(this.betCoin, 0.3, { x: this.tempRect.x + this.tempRect.width / 2, y: this.tempRect.y + this.tempRect.height / 2, ease: Linear.easeInOut })
                }
                else {//coin back to firsy position
                    TweenLite.to(this.betCoin, 0.5, { x: this.coinFirstX, y: this.coinFirstY, ease: Power1.easeInOut })
                }
                //發布滑鼠點擊結束事件
                this.dispatchEventWith(BetArea.BET_COMPLETE, true, null);
                break;
        }
    }

    /**
     * 碰撞檢測，碰撞回傳 1 ，沒碰撞回傳0 
     */
    private checkCollision(rect: eui.Rect, coinX: number, coinY: number): number {
        let isCollision: boolean = rect.hitTestPoint(coinX, coinY, false);
        isCollision ? rect.alpha = 0.4 : rect.alpha = 1
        let result: number;
        isCollision ? result = 1 : result = 0
        return result
    }





}