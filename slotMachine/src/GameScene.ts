class GameScene extends eui.Component {

    private money: eui.Label;
    private winNumbers: number[];
    private startButton: eui.Component;
    private rollAxis_0: RollAxis;
    private rollAxis_1: RollAxis;
    private rollAxis_2: RollAxis;
    private shapeMask0: egret.Shape;
    private shapeMask1: egret.Shape;
    private shapeMask2: egret.Shape;
    private cheatInput: eui.EditableText;

    private numberOfPictures: number = 5;//轉動圖片個數，如果增加或減少圖片，要改和圖片總數一樣的數字，圖片命名方式為pn
    private numberOfAxis: number = 3;//轉軸個數

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
        //遮罩
        this.rollAxis_0.mask = this.shapeMask0;
        this.rollAxis_1.mask = this.shapeMask1;
        this.rollAxis_2.mask = this.shapeMask2;
        //啟動按鈕按下後轉動監聽
        this.addEventListener(StartButton.CLICK_COMPLETE, this.startRoll, this);
        //動畫結束監聽
        this.addEventListener(RollAxis.COMPLETE, this.rollCompleteCheck, this);
    }
    /**
     * 點擊按鈕後啟動轉動
     */
    private startRoll(evt: egret.Event) {
        //移除點擊開始轉動，直到動畫結束才會再掛上監聽器
        this.removeEventListener(StartButton.CLICK_COMPLETE, this.startRoll, this)

        //每次遊戲開始扣10元
        this.money.text = `${parseInt(this.money.text) - 10}`;

        //隨即中獎 或 作弊指定中獎
        this.winNumbers = [];
        let cheatNumber: number = parseInt(this.cheatInput.text);
        if (this.isCheat(cheatNumber)) {
            for (let i = 0; i < this.numberOfAxis; i++) {
                this.winNumbers[i] = cheatNumber;
            }
        }
        else {
            this.winNumbers = this.randomWinNumbers();
        }
        // egret.log("win numbers=" + this.winNumbers);

        //告訴每個軸最後一個圖片(中獎圖片) ，並且初始化轉軸參數
        this.rollAxis_0.init(this.winNumbers[0]);
        this.rollAxis_1.init(this.winNumbers[1]);
        this.rollAxis_2.init(this.winNumbers[2]);
        
        //開始轉動
        this.rollAxis_0.rollAxis();
        this.rollAxis_1.rollAxis();
        this.rollAxis_2.rollAxis();
    }

    /**
     * 檢查NumberOfAxi個軸是否全部動畫展示完成，完成後進入this.winCheck()
     */
    private _rollCompleteCheck: number = 0;
    private rollCompleteCheck(evt: egret.Event): void {
        this._rollCompleteCheck++;
        if (this._rollCompleteCheck == this.numberOfAxis) {
            this._rollCompleteCheck = 0;
            this.winCheck()
        }
    }

    /**
     * 檢查圖片是否一樣(此函數可再優化，現在是3個軸死的)
     */
    private winCheck(): void {
        //動畫結束button掛上監聽器
        this.addEventListener(StartButton.CLICK_COMPLETE, this.startRoll, this);
        //如果三個圖案一樣，加100元
        let isWin: boolean;
        isWin = this.winNumbers[0] == this.winNumbers[1] && this.winNumbers[0] == this.winNumbers[2]
        if (isWin) {
            this.money.text = `${parseInt(this.money.text) + 100}`;
        }
    }

    /**
     * 隨機產生中獎圖片
     */
    private randomWinNumbers(): number[] {
        let tempArry: number[] = [];
        for (let i = 0; i < this.numberOfAxis; i++) {
            tempArry.push(Math.floor(Math.random() * this.numberOfPictures));
        }
        return tempArry;
    }
    /**
     * 檢查輸入欄位是否輸入正確的作弊數字，該數字為 圖片編號數字 ( 0 ~ n)，並且回傳是否為作弊模式
     * 如果輸入不正確的數字，圖片將隨機產生
     */
    private isCheat(inputNumber: number): boolean {
        let list: number[] = [];
        for (let i = 0; i < this.numberOfPictures; i++) {
            list.push(i);
        }
        let _isCheat: number = list.indexOf(inputNumber);
        if (_isCheat == -1) {
            return false;
        }
        else {
            return true;
        }

    }

}