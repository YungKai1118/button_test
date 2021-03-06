class MinesweeperComponent extends eui.Component {

    public image: eui.Image;
    public static ON_CLICK: string = "MinesweeperComponent.ON_CLICK";
    public row: number;
    public column: number;
    public componentIdex: number;
    public isTouch: boolean;


    constructor() {
        super();
        this.row = null;
        this.column = null;
        this.isTouch = false;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.returnTouch, this)

        // this.image.mask = this['ttt'];
        // this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchReleaseOutside, this)
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.tocuhMove,this)
        // this.addEventListener("MouseEvent.mousedown",this.mouseDown,this) //沒用

        /* 
        法二：先把每個component先完成eui讀取，再執行GameScene
        */
        // this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)

    }
    /**
     * 法二 function
     */
    // private uiComplete(e: eui.UIEvent): void {   
    //     this.image = this[`p9`];
    //     egret.log(this.image);
    // }

    // private mouseDown():void{
    //     console.log('aaa');
    // }
    // private touchReleaseOutside():void{
    //    this.image.texture=RES.getRes("p9_png");
    // }

    public init(_row, _column, _index): void {
        this.image = this[`p9`];
        this.row = _row;
        this.column = _column;
        this.componentIdex = _index;
    }

    public setIsOver(v: boolean): void {
        this.image.texture = v ? RES.getRes("p0_png") : RES.getRes("p9_png");
    }

    private returnTouch(e: egret.TouchEvent) {
        console.log("this click 's  row=" + this.row + " ,column=" + this.column);
        this.dispatchEventWith(MinesweeperComponent.ON_CLICK, true, [this.componentIdex, this.row, this.column]);
    }

    public showMineNumber(n): void {
        switch (n) {
            case 0:
                this.image.texture = RES.getRes("p0_png");
                break;
            case 1:
                this.image.texture = RES.getRes("p1_png");
                break;
            case 2:
                this.image.texture = RES.getRes("p2_png");
                break;
            case 3:
                this.image.texture = RES.getRes("p3_png");
                break;
            case 4:
                this.image.texture = RES.getRes("p4_png");
                break;
            case 5:
                this.image.texture = RES.getRes("p5_png");
                break;
            case 6:
                this.image.texture = RES.getRes("p6_png");
                break;
            case 7:
                this.image.texture = RES.getRes("p7_png");
                break;
            case 8:
                this.image.texture = RES.getRes("p8_png");
                break;
            case 9:
                this.image.texture = RES.getRes("p9_png");
                break;
            case 11:
                this.image.texture = RES.getRes("p11_png");
                break;
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.returnTouch, this);

    }


} 