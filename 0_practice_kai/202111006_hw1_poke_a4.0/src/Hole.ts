class Hole extends eui.Component {
    public touch: number;
    private image: eui.Image;
    public nth: number;
    public wn: number[]; //中獎位置
    public win_check: boolean;

    public constructor() {
        super()
        this.touch = 0;
        this.image = null;
        this.nth = 0;
        this.win_check = false;
    }

    public init(): Hole {
        this.touch = 777;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returntouch, this);
        return this
    }

    private returntouch(e: egret.TouchEvent): void {
        this.touch = 1;
        // console.log('touch=' + this.touch + ` ;item number:` + this.nth);
        this.image = e.target;


        for (let i = 0; i < this.wn.length; i++) {
            if (this.wn[i] == this.nth) {
                this.image.texture = RES.getRes('w4_png');
                this.win_check = true;
            }
            else if (this.win_check == false) {
                this.image.texture = RES.getRes('p6_png');
            }
        }


    }


}
