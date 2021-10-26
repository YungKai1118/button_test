class StartButton extends eui.Component {

    private button: eui.Image;
    private onClick: boolean;
    private isRollComplete: boolean;
    public static CLICK_COMPLETE: string = "CLICK_COMPLETE";

    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this)

    }

    private uiComplete(evt: eui.UIEvent): void {
        egret.log("startButtonCom")
    }


    private touchHandler(evt: egret.TouchEvent): void {

        switch (evt.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                // egret.log('TOUCH_BEGIN');
                this.button.texture = RES.getRes('button2_png')
                this.button.alpha = 0.7;
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this)
                break;
            case egret.TouchEvent.TOUCH_END:
                // egret.log('TOUCH_END');

                this.button.texture = RES.getRes('button1_png')
                this.button.alpha = 1;
                this.dispatchEventWith(StartButton.CLICK_COMPLETE, true, null);
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this)
                break;
        }
    }
}
