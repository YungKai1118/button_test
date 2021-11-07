class GameScene extends eui.Component {

    private turntable: Turntalbe;
    private cheatLabel: eui.EditableText;
    private betCoin: eui.Image;
    private betArea: BetArea;
    private endNumber: number;
    private moneyLable: eui.Label;
    private warnLable: eui.Label;

    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)
    }

    private uiComplete(e: eui.UIEvent): void {
        egret.log("gamesceneComplete");
        this.init();
    }
    /**
     * 開始下注
     */
    private init(): void {
        //監聽下注是否完成
        this.addEventListener(BetArea.BET_COMPLETE, this.betOnComplete, this);
        //更新下注資訊
        this.updateInfor(this.betArea.userBetNumber);
    }
    /**-
     * 接收下注結束事件，按鈕功能啟動
     */
    private betOnComplete(evt: egret.Event): void {
        //監聽按鈕是否點及完畢
        this.addEventListener(StartButton.CLICK_COMPLETE, this.launchTurn, this);
    }

    /**
     * 啟動轉盤
     */
    private launchTurn(evt: egret.Event): void {
        //更新下注資訊
        this.updateInfor(this.betArea.userBetNumber);
        //若沒有下注不轉動
        if (this.betArea.userBetNumber == -1) {
            return;
        }
        //監聽轉盤是否轉動完成
        this.addEventListener(Turntalbe.ON_COMPLETE, this.checkWin, this);
        //移除按鈕監聽
        this.removeEventListener(StartButton.CLICK_COMPLETE, this.launchTurn, this);
        //移除下注區間聽
        this.removeEventListener(BetArea.BET_COMPLETE, this.betOnComplete, this);
        //每次玩遊戲扣10元
        this.moneyLable.text = `${parseInt(this.moneyLable.text) - 10}`;
        //隨機產生轉盤結果 或 作弊結果
        this.endNumber = this.randomWin(parseInt(this.cheatLabel.text));
        egret.log("end number = " + this.endNumber);
        //告知turntalbe轉盤結果
        this.turntable.init(this.endNumber);
        //轉盤開始轉動
        this.turntable.startTurn();
        //移除按鈕監聽器
        // this.betArea.enabled(false);
        this.betArea.betArearemoveEventListener();
    }

    /**
     * 檢查是否中獎
     */
    private checkWin(): void {
        this.removeEventListener(Turntalbe.ON_COMPLETE, this.checkWin, this);
        //中獎+100
        if (this.betArea.userBetNumber + 1 == this.endNumber) {
            this.moneyLable.text = `${parseInt(this.moneyLable.text) + 100}`;
        }
        //下注區籌碼回到原點,以及掛回按鈕監聽器
        this.betArea.init();
        // this.betArea.enabled(true);
        //重新開始下注
        this.init();
        //更新下注資訊
        this.updateInfor(this.betArea.userBetNumber);
    }

    /**
     * 產生隨機結果 或 產生作弊結果
     */
    private randomWin(cheatNumber): number {
        let tempArry: number[] = [];
        for (let i = 0; i < this.turntable.numberOfCut; i++) {
            tempArry.push(i + 1); //產生 1 至 7 數字
        }
        if (tempArry.indexOf(cheatNumber) == -1) {  //沒有輸入作弊碼，隨機產生結果
            tempArry.sort(function (a, b) { return Math.random() - 0.5; })
            tempArry.length = 1;
            return tempArry[0];
        }
        else {
            return cheatNumber;
        }
    }

    /**
     * 更新提示訊息
     */
    private updateInfor(betNumber): void {
        if (betNumber == -1) {
            this.warnLable.text = '請下注';
        }
        else {
            this.warnLable.text = '';
        }
    }
}