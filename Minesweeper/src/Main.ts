class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        // egret.log("start loadimg");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig('resource/game_res.json', 'resource/');

        let tt= new TimerEventExample;
    }

    private group_list: string[] = ["preload"];
    private onConfigComplete(e: RES.ResourceEvent) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        this.group_list.forEach((v) => {
            RES.loadGroup(v);
        }, this);
    }

    private onGroupComplete(e: RES.ResourceEvent) {
        // console.log(e);
        let idx: number = this.group_list.indexOf(e.groupName);
        this.group_list.splice(idx, 1);
        
        //全部資源OK才初始化
        if (this.group_list.length == 0) {
            //THEME---------------------------------------------------------------------------------
            this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
            this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

            let theme = new eui.Theme(`resource/default.thm.json?v=${new Date().getTime()}`, this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, (e: eui.UIEvent) => {
                this.init();
            }, this);
        }
    }

    private init(): void {
        let gameScene: GameScene = new GameScene();
        gameScene.skinName = "GameSceneSkin";
        this.addChild(gameScene);
    }
}



class TimerEventExample extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        const timer: egret.Timer = new egret.Timer(1000, 5);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        timer.start();
    }
    private timerFunc(event: egret.TimerEvent) {
        egret.log("timerFunc count" + (<egret.Timer>event.target).currentCount);
        //timerFunc count1
        //timerFunc count2
        //timerFunc count3
        //timerFunc count4
        //timerFunc count5
    }
    private timerComFunc(event: egret.TimerEvent) {
        egret.log("timerComFunc count" + (<egret.Timer>event.target).currentCount);
        ////timerFunc count5
    }
}



