class Turntalbe extends eui.Component {

    private turntableImage: eui.Image
    private totalRoundNumber: number = 1;
    private countRoundNumber: number = 0;
    private stopAngle: number;
    private tempAngel: number = 0;
    public numberOfCut: number = 7; //轉盤的分割個數，若需要換圖片增加轉盤個數，可變動此值，後續旋轉角度將自動計算。但圖片的0度右方必須為1，左方為最後一個數字


    public static ON_COMPLETE: string = "Turntalbe.ON_COMPLETE";

    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)
    }

    private uiComplete(e: eui.UIEvent): void {

    }
    /**
     * 取得轉動結果
     */
    public init(endNumber): void {
        let eachCutAngle = 360 / (this.numberOfCut);
        this.stopAngle = eachCutAngle * (this.numberOfCut - endNumber) + Math.random() * (eachCutAngle - 1);
    }

    public startTurn(): void {
        // TweenLite.to(this.turntableImage, 3, { rotation: 360, ease: Power2.easeIn })
        TweenLite.to(this.turntableImage, 4, { rotation: 360 * 2, ease: Power2.easeIn, onComplete: this.checkRound, onCompleteScope: this })
    }
    private checkRound(): void {
        this.countRoundNumber == this.totalRoundNumber ? this.endTurn() : this.onTurn();
        this.countRoundNumber++;
    }
    private onTurn(): void {
        TweenLite.to(this.turntableImage, 0.7, { rotation: 360, ease: Linear.easeNone, onComplete: this.checkRound, onCompleteScope: this })
    }
    private endTurn(): void {
        let angle0 = 90 + 1;
        TweenLite.to(this.turntableImage, 6, { rotation: 360 * 3 + angle0 + this.stopAngle, ease: Power1.easeOut, onComplete: this.onComplete, onCompleteScope: this })
    }

    private onComplete(): void {
        this.dispatchEventWith(Turntalbe.ON_COMPLETE, true, null)
        this.countRoundNumber = 0;
        // egret.log(this.)
    }
}