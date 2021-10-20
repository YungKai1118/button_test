/**
 * 一個選項
 */
class Hole extends eui.Component {

    public static CLICK_HOLE: string = "Hole.CLICK_HOLE";

    // public touch: number;
    private image: eui.Image;
    // public win_number: number[]; //中獎位置
    // public win_check: boolean;

    private my_index: number;
    /**
     * 
     */
    public constructor() {
        super()
        // this.touch = 0;
        this.image = null;
        // this.win_check = false;
        this.addEventListener("AAA", this.onAAA, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnTouch, this);
    }

    public init(index: number): void {
        this.my_index = index;
    }

    private onAAA(e: egret.Event): void {
        egret.log("A");
    }
    /**
     * 小駝峰式命名
     */
    private returnTouch(e: egret.TouchEvent): void {
        // this.touch = 1;
        // console.log('touch=' + this.touch + ` ;item number:` + this.nth);
        this.image = e.target;
        this.dispatchEventWith(Hole.CLICK_HOLE, false, this.my_index);
        // this.dispatchEventWith("AAA");
        this.dispatchEvent(new egret.Event("AAA"));
        let sound: egret.Sound = RES.getRes('bet_mp3')
        sound.play(0, 1);
    }

    public setIsWin(isWin: boolean): void {
        if (isWin) {
            this.image.texture = RES.getRes('w4_png');
        }
        else {
            this.image.texture = RES.getRes('p6_png');
        }


    }
}
