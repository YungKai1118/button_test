class StartButton extends eui.Component {

    private buttonUp: eui.Image;
    private buttonDown: eui.Image;
    private onClick: boolean;
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
                this.buttonUp.alpha = 0;
                this.buttonDown.alpha = 1;
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this)
                break;
            case egret.TouchEvent.TOUCH_END:
                // egret.log('TOUCH_END'); 
                this.buttonUp.alpha = 1;
                this.dispatchEventWith(StartButton.CLICK_COMPLETE, true, null);
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this)
                break;
        }
    }
}
