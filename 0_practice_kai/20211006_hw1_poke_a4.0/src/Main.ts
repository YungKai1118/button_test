class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        egret.log("start loadimg");

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig('resource/game.res.json', 'resource/');

    }

    private group_list: string[] = ['preload_w', 'preload_p'];
    private onConfigComplete(e: RES.ResourceEvent) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        // for (let i: number = 0; i < this.group_list.length; ++i) {
        //     RES.loadGroup(this.group_list[i]);
        // }
        this.group_list.forEach((v) => {
            RES.loadGroup(v);
        },this);

    }

   
    private onGroupComplete(e: RES.ResourceEvent) {

        let idx: number = this.group_list.indexOf(e.groupName);
        this.group_list.splice(idx, 1); //刪除陣列第0個元素，即刪除自己

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

    private init():void {
        let gameScene: GameScene = new GameScene();
        gameScene.skinName = "GameSceneSkin";
        this.addChild(gameScene);
        

    }
}




