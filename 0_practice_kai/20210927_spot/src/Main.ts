class Main extends egret.DisplayObjectContainer {
    

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(Circle.Event_Click,this.onClickCircle,this);
         }
    
    private textCount:egret.TextField;
    private textTimer:egret.TextField;
    private textDes:egret.TextField;
    private timer:egret.Timer;
    private color:number;

    private onAddToStage(event: egret.Event) {
        egret.log("start AAA");
        // egret.log("x="+this.x);
        // egret.log(this.stage.stageWidth);

        var stageW:number=this.stage.stageWidth;
        var stageH:number=this.stage.stageHeight;

        let bg= new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        //背景，設定大小為應用窗大小
        bg.graphics.drawRect(0,0,stageW,stageH);
        bg.graphics.endFill();
        this.addChild(bg);

        this.textCount=new egret.TextField();
        this.textCount.textColor=0xffffff;
        this.textCount.y=530;
        this.textCount.text="分數 : 0";

        this.textTimer= new egret.TextField();
        this.textTimer.textColor=0xffffff;
        this.textTimer.y=620;
        this.textCount.text="倒數計時 : ";

        this.textDes=new egret.TextField();
        this.textDes.text="點擊第一個顏色開始";
        this.textDes.y=700;

        this.textCount.textAlign=
            this.textTimer.textAlign=
                this.textDes.textAlign=
                    egret.HorizontalAlign.CENTER;
        this.textCount.width=
            this.textTimer.width=
                this.textDes.width=stageW;
        this.textCount.textColor=
            this.textTimer.textColor=
                this.textDes.textColor=0x000000;

        this.addChild(this.textCount);
        this.addChild(this.textTimer);
        this.addChild(this.textDes);

        //timer 事件觸發器按每秒觸發一次執行onTimer，完成30次停止，執行onTimerComplete, 並移除Circle.Event_Click,使用無無法再次點擊圓
        this.timer= new egret.Timer(1000,30);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
                
        //初始化4*4個圓
        var radius:number = 50;
        for (let i:number = 0; i<4 ;i++)
            for (let t:number = 0; t<4 ;t++)
            {
                let tempx:number=150+radius*2*t;
                let tempy:number=140+radius*2*i;
                let circle: Circle = new Circle(tempx,tempy,radius);
                this.addChild(circle);
            }
             
                 
        }

    private count:number=0;
    private onClickCircle(e:any):void{
        if(this.count==0){
            this.color=e.data;
            this.textCount.text="分數:"+(++this.count);
            this.timer.start();
        }
        else if(this.color==e.data){
            this.textCount.text="分數:"+(++this.count);
        }
    }

    private onTimer(e:egret.TimerEvent):void{
        this.textTimer.text="倒數計時 : "+(this.timer.repeatCount-this.timer.currentCount);
    }  

    private onTimerComplete(e:egret.TimerEvent):void{
        this.textDes.text="累了嗎? 再接再厲"
        this.removeEventListener(Circle.Event_Click,this.onClickCircle,this);
    }

}




class Circle extends egret.Sprite {

    public constructor(cx:number,cy:number,cr:number){
        super();
        this.init(cx,cy,cr);
        
    }

    private shape:egret.Shape;
    private shapex:number;
    private shapey:number;
    private shaper:number;
    private color:number;
    public static Event_Click:string="Event_Click";
    private colorList:number[]=[13408665,16777113,6710937,
        16750848,16776960,39372,13421721,13382553,
        10079232,16737894,16776960,3381708,13395456,
        10066329,13421619,16750899,16777164,39219,
        39372,13421772,16737894,16737792,16777062,
        39270,13395507,16764057,13395456,13369446,
        39321,16763955];
    //隨機選色
    private randomColor():number{
        //// 從list隨機選出一組顏色
        // egret.log(Math.random());
        // egret.log(Math.round(Math.random()*this.colorList.length));
        return this.colorList[Math.round(Math.random()*this.colorList.length)];
    }
    //init 設定   
    //1.設定圓為當前現實容器中的中心點，為當前圓的直徑除以2，好處為移動座標以圓心為起點
    //2.偵聽當前用戶的觸摸事件,為了後續處理用戶點擊圓以後的邏輯做準備
    //3.touchable 設置為 true, 使當前顯示對象可以被點擊
    private init(cx:number,cy:number,cr:number):void{
        this.color=this.randomColor();
        this.shape=new egret.Shape();
        this.shape.graphics.beginFill(this.color);
        this.shape.graphics.drawCircle(0,0,cr);
        this.shape.graphics.endFill();
        //父類中心點
        this.shape.x=-cr;
        this.shape.y=-cr;
        // egret.log(this.shape.x=-cr);

        this.shapex=cx;
        // egret.log(this.shapex=cx);
        this.shapey=cy;
        // egret.log(this.shapey=cy);
        this.shaper=cr;
        // egret.log(this.shaper=cr);

        this.touchEnabled=true;
        //偵聽使用者的移動和觸摸
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this,false);
        this.addChild(this.shape);
        this.x=cx;
        egret.log("this.x="+this.x);
        this.y=cy;
        egret.log("this.y="+this.y);

    }
    
    private onTouch (e:egret.TouchEvent):void{
        //通知顯示對象的父類
        var par = this.parent;
        par.dispatchEventWith(Circle.Event_Click,false,this.color);
        //防止多次點擊, Tween 創建動畫緩動
        this.touchEnabled=!1;
        var tween:egret.Tween=egret.Tween.get(this);
        tween.to( { alpha : 0.1}, 500, egret.Ease.sineOut);
        tween.call(function(){
            this.visible=false;
            par.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);    
            }
            ,this);
        
        var circleList : Circle[]=[] ;
        var tweenList : egret.Tween[]=[];
        var radius:number = this.shaper/2;
        var tempx:number;
        var tempy:number;
        var tempr:number;
    
        var g:number=0;
        for(let i:number=0;i<2;i++)
            for(let t:number=0;t<2;t++)
            {
                tempx=this.shapex-this.shaper+radius*2*t;
                tempy=this.shapey-this.shaper+radius*2*i;
                circleList[g]=new Circle(tempx,tempy,radius);
                circleList[g].alpha=0.1;
                circleList[g].scaleX=0.8;
                circleList[g].scaleY=0.8;
                par.addChild(circleList[g]);
                tweenList[g]=egret.Tween.get(circleList[g]);
                tweenList[g].to({alpha:1,scaleX:1,scaleY:1},1000,egret.Ease.sineIn);
                g++;
            }


    }
    
}

