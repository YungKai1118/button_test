class GameScene extends eui.Component {

    private GAME_COLUMN: number = 16;
    private GAME_ROW: number = 16;//魔術數字
    private mine_list: MinesweeperComponent[][]; //地雷格子
    private numberOfComponent: number = this.GAME_ROW * this.GAME_COLUMN;   //總格子數
    private numberOfMine: number = 40;         //炸彈數
    private minePosition: number[];
    private countOpenComponet: number = 0;

    private ShowTimeLable: eui.Label;
    private timer: egret.Timer;

    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)

    }

    private uiComplete(e: eui.UIEvent): void {

        //將eui資源存入 mine_list --------------------------------------------------------------
        this.mine_list = [];   //創造GAME_ROW*GAME_COLUMN陣列
        let count: number = 0;
        for (let i = 0; i < this.GAME_ROW; i++) {
            this.mine_list[i] = [];
            for (let t = 0; t < this.GAME_COLUMN; t++) {
                this.mine_list[i][t] = this[`mine_${count}`];
                this.mine_list[i][t].init(i, t, count);
                count++;
            }
        }

        //第一次點擊後放置地雷，第一次點擊位置不可以是地雷-----------------------------------------
        this.addEventListener(MinesweeperComponent.ON_CLICK, this.deployMine, this, false, 2)

        //開始遊戲
        this.addEventListener(MinesweeperComponent.ON_CLICK, this.gamePlaying, this, false, 1);   //useCapture?  是什麼? 

        //計時器
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        /**learning:
         * 開始和結束方式如下二
         * this.timer.start();
         * this.timer.stop();
         */

    }
    /**
     * 將時間顯示至lable
     */
    private onTimer(e: egret.TimerEvent): void {
        
        this.ShowTimeLable.text = String(this.timer.currentCount);
    }

    /**
     * 第一次點擊後遊戲開始，此位置不可以是地雷。
     * 完成放置地雷後，移除此函數監聽器。
     */
    private deployMine(e: egret.Event): void { //放置地雷，若第一次點擊位置為地雷，重新放置地雷
        this.minePosition = this.randomMine();
        let index = e.data[0];
        let row = e.data[1];
        let column = e.data[2];
        let isMine: boolean = this.isMine(row, column);
        while (isMine) {  //直到第一個click不是地雷為止
            this.minePosition = this.randomMine();
            isMine = this.isMine(row, column);
            console.log("reset mine position");
        }
        this.removeEventListener(MinesweeperComponent.ON_CLICK, this.deployMine, this)   //放置好地雷後移除此事件
        console.log("mine position : " + this.minePosition);

        this.timer.start();
        /**
         * cheat 打開地雷
         */
        // this.showAllMine();
    }

    /**
     * 雖機產生40個值，做為地雷位置使用
     */
    private randomMine(): number[] {
        let arr_temp: number[] = [];
        for (let i = 0; i < this.numberOfComponent; i++) {
            arr_temp.push(i);
        }
        arr_temp.sort(function (a, b) {
            return Math.random() - 0.5
        })
        arr_temp.length = this.numberOfMine      //炸彈數
        arr_temp.sort(function (a, b) {       //排序，小至大
            return a - b;
        })
        return arr_temp;
    }

    private gamePlaying(e: egret.Event): void {
        let row = e.data[1];
        let column = e.data[2];

        this.showResult(row, column);
    }

    private showResult(row: number, column: number): void {
        let mineNumber: number;
        mineNumber = this.countMine(row, column);
        if (this.isMine(row, column)) {
            this.removeEventListener(MinesweeperComponent.ON_CLICK, this.gamePlaying, this);
            this.showAllMine();
            this.timer.stop();
        }

        if (row > -1 && row < this.GAME_ROW && column > -1 && column < this.GAME_COLUMN && !this.mine_list[row][column].isTouch) {
            this.mine_list[row][column].showMineNumber(mineNumber);
            this.mine_list[row][column].isTouch = true; //顯示過圖片的元件不再進入showResult
            this.countOpenComponet++;
            if (mineNumber == 0) {
                this.showResult(row, column - 1);
                this.showResult(row, column + 1);
                this.showResult(row - 1, column - 1);
                this.showResult(row + 1, column - 1);
                this.showResult(row - 1, column + 1);
                this.showResult(row + 1, column + 1);
                this.showResult(row - 1, column);
                this.showResult(row + 1, column);
            }
            if (this.countOpenComponet == this.numberOfComponent - this.numberOfMine) { //所有格子都成功點開，遊戲獲得勝利
                this.removeEventListener(MinesweeperComponent.ON_CLICK, this.gamePlaying, this);
                console.log("win!");
                this.timer.stop();
            }
        }
        //learning  有關egret.Point的使用範例
        // let pp: egret.Point = this.getPosByIndex(56);
        // pp.x;//col
        // pp.y;//row
    }

    /**
     * 輸入row,col ，傳回index
     */
    private getIndexByPos(row, column): number {
        let index: number;
        index = row * this.GAME_ROW + column;
        return index;
    }
    /**
     * 輸入index ，傳回row,col
     */
    private getPosByIndex(index: number): egret.Point {
        let pos: egret.Point = new egret.Point();
        let row = Math.floor(index / this.GAME_ROW);
        let col = index - row * this.GAME_ROW;
        pos.x = col;
        pos.y = row;
        return pos;
    }
    /**
     * 計算周遭8個地雷數   ,遇到地雷移除聽診器
     */
    private countMine(row: number, column: number): number {
        let mineNumber: number = 0;
        if (this.isMine(row, column)) {
            mineNumber = 11;//本身是炸彈，值設為11，因為最初圖片命名為11
            return mineNumber;
        }
        // 判斷周遭8個是否為地雷
        if (this.isMine(row, column - 1)) { mineNumber++; }//左   
        if (this.isMine(row, column + 1)) { mineNumber++; }//右
        if (this.isMine(row - 1, column - 1)) { mineNumber++; }//左上
        if (this.isMine(row + 1, column - 1)) { mineNumber++; }//左下
        if (this.isMine(row - 1, column + 1)) { mineNumber++; }//右上
        if (this.isMine(row + 1, column + 1)) { mineNumber++; }//右下
        if (this.isMine(row - 1, column)) { mineNumber++; }//上
        if (this.isMine(row + 1, column)) { mineNumber++; }//下

        return mineNumber;
    }

    /**
     * 傳入點擊位置row,col，回傳是否為地雷 true , false (boolean)
     */
    private isMine(row: number, col: number): boolean {
        let index = this.getIndexByPos(row, col);
        let isMine: boolean = false;
        if (row < 0 || row > this.GAME_ROW - 1 || col < 0 || col > this.GAME_COLUMN - 1) {  //超出遊戲格子範圍，判斷為非炸彈
            isMine = false;
        }
        else {
            isMine = this.minePosition.indexOf(index) != -1;
        }
        return isMine;
    }
    /**
     * 顯示所有地雷，(目前設為遊戲輸了時候顯示所有地雷，也可以提前顯示作弊)
     */
    private showAllMine(): void {  //顯示所有地雷
        let count: number = 0;
        for (let i = 0; i < this.GAME_ROW; i++) {
            for (let t = 0; t < this.GAME_COLUMN; t++) {
                if (this.isMine(i, t)) {
                    this.mine_list[i][t].showMineNumber(11);
                }
                count++;
            }
        }
    }

}

