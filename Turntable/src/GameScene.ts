class GameScene extends eui.Component {

    private turnTableImage: eui.Image;

    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)
    }

    private uiComplete(e: eui.UIEvent): void {

        TweenLite.to(this.turnTableImage, 1, { rotation: 360, ease: Linear.easeNone })
        this.test();
    }
    private test(): void {
        egret.log("AAA")
        // TweenLite.to(this.ttt, 5, { rotation: 360, ease: Linear.easeNone })
    }


}