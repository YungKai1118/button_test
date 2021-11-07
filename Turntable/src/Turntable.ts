class Turntalbe extends eui.Component {

    private turntableImage: eui.Image
    private totalRoundNumber: number = 5;//轉盤旋轉圈數(等速時，啟動和結束圈數不算在內)
    private countRoundNumber: number = 0;
    private stopAngle: number;
    public numberOfCut: number = 7; //轉盤的分割個數，若需要換圖片增加轉盤個數，可變動此值，後續旋轉角度將自動計算。但圖片的0度右方必須為1，左方為最後一個數字


    public static ON_COMPLETE: string = "Turntalbe.ON_COMPLETE";

    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)
    }

    private uiComplete(e: eui.UIEvent): void {
        //donoting
        egret.log("turntableComplete");
    }

    /**
     * 取得轉動結果
     */
    public init(endNumber): void {
        // 每個被切割角度=360/分割數
        let eachCutAngle = 360 / (this.numberOfCut);
        //由GameScene獲得停止轉盤的位置， 計算該角度且存至 stopAngle
        this.stopAngle = eachCutAngle * (this.numberOfCut - endNumber) + Math.random() * (eachCutAngle - 1);
    }

    /**
     * 啟動轉動的緩動效果
     */
    public startTurn(): void {
        TweenLite.to(this.turntableImage, 4, { rotation: 360 * 2, ease: Power2.easeIn, onComplete: this.checkRound, onCompleteScope: this })
    }

    /**
     * 是否繼續轉動檢查(等速轉動)
     */
    private checkRound(): void {
        this.countRoundNumber == this.totalRoundNumber ? this.endTurn() : this.onTurn();
        this.countRoundNumber++;
    }

    /**
     * 等速轉動
     */
    private onTurn(): void {
        TweenLite.to(this.turntableImage, 0.7, { rotation: 360, ease: Linear.easeNone, onComplete: this.checkRound, onCompleteScope: this })
    }

    /**
     * 結束轉動
     */
    private endTurn(): void {
        let angle0 = 90 + 1;
        TweenLite.to(this.turntableImage, 8, { rotation: 360 * 3 + angle0 + this.stopAngle, ease: Power1.easeOut, onComplete: this.onComplete, onCompleteScope: this })
    }

    /**
     * 發布轉動結束事件
     */
    private onComplete(): void {
        this.dispatchEventWith(Turntalbe.ON_COMPLETE, true, null)
        //轉動圈數初始化
        this.countRoundNumber = 0;
    }
}