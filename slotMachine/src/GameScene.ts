class GameScene extends eui.Component {

    private Money: eui.Label;
    private WinNumbers: number[];
    private StartButton: eui.Component;
    private rollAxis_0: RollAxis;
    private rollAxis_1: RollAxis;
    private rollAxis_2: RollAxis;
    private NumberOfPictures: number = 5;//轉動圖片個數，如果增加或減少圖片，要改和圖片總數一樣的數字，圖片命名方式為pn
    private NumberOfAxis: number = 3;//轉軸個數
    private shapeMask0: egret.Shape;
    private shapeMask1: egret.Shape;
    private shapeMask2: egret.Shape;
    private cheatInput: eui.EditableText;

    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)
    }
    /**
     * 按鈕監聽
     * 轉軸動畫完成監聽
     */
    private uiComplete(e: eui.UIEvent): void {
        egret.log("GameSceneComplete");
        this.rollAxis_0.mask = this.shapeMask0;
        this.rollAxis_1.mask = this.shapeMask1;
        this.rollAxis_2.mask = this.shapeMask2;
        this.addEventListener(StartButton.CLICK_COMPLETE, this.StartRoll, this);
        this.addEventListener(RollAxis.ON_COMPLETE, this.RollCompleteCheck, this);
    }

    private StartRoll(evt: egret.Event) {
        //移除點擊開始轉動，直到動畫結束才會再掛上監聽器
        this.removeEventListener(StartButton.CLICK_COMPLETE, this.StartRoll, this)
        //每次遊戲開始扣10元
        this.Money.text = `${parseInt(this.Money.text) - 10}`;

        //隨即中獎 或 作弊指定中獎
        this.WinNumbers = [];
        let cheatNumber: number = parseInt(this.cheatInput.text);
        if (this.IsCheat(cheatNumber)) {
            for (let i = 0; i < this.NumberOfAxis; i++) {
                this.WinNumbers[i] = cheatNumber;
            }
        }
        else {
            this.WinNumbers = this.randomWinNumbers();
        }

        egret.log("win numbers=" + this.WinNumbers);
        //告訴每個軸最後一個圖片(中獎圖片) ，並且初始化轉軸參數
        this.rollAxis_0.init(this.WinNumbers[0]);
        this.rollAxis_1.init(this.WinNumbers[1]);
        this.rollAxis_2.init(this.WinNumbers[2]);
        //開始轉動
        this.rollAxis_0.RollAxis();
        this.rollAxis_1.RollAxis();
        this.rollAxis_2.RollAxis();
    }
    /**
     * 檢查NumberOfAxi個軸是否全部動畫展示完成，完成後進入this.winCheck()
     */
    private _RollCompleteCheck: number = 0;
    private RollCompleteCheck(evt: egret.Event): void {
        this._RollCompleteCheck++;
        if (this._RollCompleteCheck == this.NumberOfAxis) {
            this._RollCompleteCheck = 0;
            this.winCheck()
        }
        // egret.log(this._RollCompleteCheck)
    }

    /**
     * 檢查圖片是否一樣(此函數要再優化，現在是3個軸死的)
     */
    private winCheck(): void {
        //動畫結束button掛上監聽器
        this.addEventListener(StartButton.CLICK_COMPLETE, this.StartRoll, this);
        //如果三個圖案一樣，加100元
        let IsWin: boolean;
        IsWin = this.WinNumbers[0] == this.WinNumbers[1] && this.WinNumbers[0] == this.WinNumbers[2]
        if (IsWin) {
            this.Money.text = `${parseInt(this.Money.text) + 100}`;
        }
    }

    /**
     * 隨機產生中獎圖片
     */
    private randomWinNumbers(): number[] {
        let tempArry: number[] = [];
        for (let i = 0; i < this.NumberOfAxis; i++) {
            tempArry.push(Math.floor(Math.random() * this.NumberOfPictures));
        }

        return tempArry;
    }
    /**
     * 檢查輸入欄位是否輸入正確的作弊數字，該數字為 圖片編號數字 ( 0 ~ n)，並且回傳是否為作弊模式
     * 如果輸入不正確的數字，圖片將隨機產生
     */
    private IsCheat(inputNumber: number): boolean {
        let list: number[] = [];
        for (let i = 0; i < this.NumberOfPictures; i++) {
            list.push(i);
        }
        let _IsCheat: number = list.indexOf(inputNumber);
        if (_IsCheat == -1) {
            return false;
        }
        else {
            return true;
        }

    }

}