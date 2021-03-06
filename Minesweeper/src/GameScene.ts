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
    private image: eui.Image;

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

        // 觸碰的圖示效果
        //test ---------------------
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this)
        // this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this)
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchReleaseOutside, this)
        // this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchCancel, this)

        //第一次點擊後放置地雷，第一次點擊位置不可以是地雷-----------------------------------------
        this.addEventListener(MinesweeperComponent.ON_CLICK, this.deployMine, this, false, 2)  //其實在這邊和下面開始遊戲誰先開始執行無所謂

        //開始遊戲
        this.addEventListener(MinesweeperComponent.ON_CLICK, this.gamePlaying, this, false, 1);   //useCapture?  是什麼? 

        //計時器
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        /**learning:
         * 開始和結束方式如下二
         */
        // this.timer.start();
        // this.timer.stop();

        window.addEventListener('mousedown', this.onMouseDown, false);
        // 关闭网页的右键事件
        document.oncontextmenu = function () {
            return false;
        }


    }
    //日後研究學習
    private onMouseDown(event) {
        if (event.button == 0) {

            console.log("鼠标左键!")

        } else if (event.button == 2) {

            console.log("鼠标右键!");

        }
    }


    // private checkCollision(_stageX: number, _stageY: number, Mine: MinesweeperComponent): boolean {
    //     let IsCollistion: boolean;
    //     IsCollistion = Mine.hitTestPoint(_stageX, _stageY)
    //     return IsCollistion;
    // }
    /**
     * 滑鼠 mousedown以後移動，產生點擊換圖效果，使用碰撞方式判斷每個componnent是否被被點住
     */
    private touchMove(e: egret.TouchEvent): void {

        let component: MinesweeperComponent = e.target.parent;

        //不是元件略過
        if (component instanceof MinesweeperComponent == false) {
            return;
        }

        //遍尋全世界component
        for (let i = 0; i < this.GAME_ROW; i++) {
            for (let t = 0; t < this.GAME_COLUMN; t++) {
                let target: MinesweeperComponent = this.mine_list[i][t];

                //已開過略過
                if (target.isTouch) {
                    continue;
                }
                //是滑鼠壓到的over狀態
                // 1
                // let isOver: boolean = target == component;
                //   target.setIsOver(isOver);

                //2
                if (target == component) {
                    target.setIsOver(true);
                    // target.showMineNumber(0);
                }
                //不是就還原一般狀態
                else {
                    target.setIsOver(false);
                    // target.showMineNumber(9);
                }
                //3
                // target.setIsOver(target == component);
            }
        }
        return;

        // let _p0: egret.Texture = RES.getRes("p0_png");
        // let _p9: egret.Texture = RES.getRes("p9_png");
        // let IsCollistion: boolean;
        // console.log("X=" + e.stageX + "  Y=" + e.stageY);
        // // image.texture = RES.getRes("p0_png");
        // for (let i = 0; i < this.GAME_ROW; i++) {
        //     for (let t = 0; t < this.GAME_COLUMN; t++) {
        //         if (!this.mine_list[i][t].isTouch) {
        //             IsCollistion = this.checkCollision(e.stageX, e.stageY, this.mine_list[i][t]);
        //             let p:egret.Point = this.localToGlobal(this.mine_list[i][t].x, this.mine_list[i][t].y);
        //             let p2:egret.Point = this.globalToLocal(e.stageX, e.stageY);
        //             if (IsCollistion) {
        //                 this.mine_list[i][t].image.texture = _p0;
        //             }
        //             else {
        //                 this.mine_list[i][t].image.texture = _p9;
        //             }
        //         }
        //     }
        // }

        // console.log(image.hitTestPoint(e.stageX, e.stageY))
        // console.log("touchMove")
        // console.log(document.onmousedown)
        // console.log(e.touchDown)
        // console.log(onmousedown)
        // console.log(image)
    }

    // private touchReleaseOutside(e: egret.TouchEvent): void { 
    //     // image.texture = RES.getRes("p0_png");
    //     console.log("touchReleaseOutside")
    //     // console.log(image)
    // }
    // private touchEnd(e: egret.TouchEvent): void {
    //     // image.texture = RES.getRes("p0_png");
    //     console.log("touchEnd")
    //     // console.log(image)
    // }

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
            return;
        }

        if (row > -1 && row < this.GAME_ROW && column > -1 && column < this.GAME_COLUMN && !this.mine_list[row][column].isTouch) {
            let target: MinesweeperComponent = this.mine_list[row][column];
            target.showMineNumber(mineNumber);
            target.isTouch = true; //顯示過圖片的元件不再進入showResult
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
        else { return; }


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

