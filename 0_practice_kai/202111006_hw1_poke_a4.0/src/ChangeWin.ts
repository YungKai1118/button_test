// TypeScript file
class ChangeWin extends eui.Component {  //外部要告知遊戲是否開始了

    private ifgamestart: boolean;
    private button_1: eui.Button;
    private textinput_1: eui.TextInput;
    public button_touchtap: boolean;
    public win_n: number;


    constructor(ifgamestart: boolean) {
        super();
        this.ifgamestart = ifgamestart;
        this.win_n=5;

    }

    public init() {
        this.button_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch, this)
    }

    private ontouch(e: egret.TouchEvent) {
        
        if (this.ifgamestart) { //如果遊戲開始，移除按鈕功能
            this.button_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouch, this)

        }
        else {                  // 遊戲還沒開始，回傳輸入值
            this.button_touchtap = true;

            if (this.win_n > 0 && this.win_n < 26) {
                this.win_n = parseInt(this.textinput_1.text);
            }
            else {
                this.textinput_1.text='請重新輸入正確的數'
            }
        }
    }

}