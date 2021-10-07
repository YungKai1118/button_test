
class MyComponent extends eui.Component {

    private icon: eui.Image;

    public arr_index: number;

    public constructor() {
        super();
    }

    public hide(): void {
        console.log("aa")
        // this.visible=false;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)

    }

    private onTouch(e: egret.TouchEvent): void {
        // this.icon=e.target;
        // this.icon.texture = RES.getRes('w4_png');
        // let image: eui.Image = e.target;
        // image.texture = RES.getRes('w4_png');
        this.visible=false;
    }
}
