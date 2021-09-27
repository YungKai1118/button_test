class Main extends egret.DisplayObjectContainer {
    

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        var example: ExampleEventDispatcher = new ExampleEventDispatcher();
        example.dispatchEventWith("complete");



    }

    private onAddToStage(event: egret.Event) {
        egret.log("start AAA");
 
        const redCar = new Car('紅色');

        console.log(redCar.getDescription()); // 我是車子 - 紅色
        console.log(redCar.triggerBrakes()); // 用機密方式煞車帥一波

        // 敵對廠商覺得太帥，買來解體，想偷看煞車方式就會出錯
        // 因為 brakes 是私有的，看不到裡面的值
        // console.log(redCar.brakes);

        const greenCar = new CarII('綠色');

        console.log(greenCar.getDescription()); // 我是車子 - 綠色 第二代強化版
        console.log(greenCar.triggerBrakes()); // 用了商業機密的煞車方式 的無敵改良版
    }

}

class Car {

    public descroption: string;
    public color: string;
    private brakes: string;
    // public brakes: string;
    constructor(color:string){
        this.descroption ="我是車子"
        this.color=color;
        this.brakes = '商業機密的煞車方式';
    }
    
    public getDescription():string{
        // egret.log("aaa");
        return `${this.descroption} - ${this.color}`;
        // egret.log("bbb");
        
    }
    
    public triggerBrakes(): string {
    if (this.brakes === '商業機密的煞車方式') {
      return '用了商業機密的煞車方式';
    }
    return '沒有機密方式，沒有煞車';
  }
}

// 第二個類別 
class CarII extends Car {
  public getDescription(): string {
    return `${super.getDescription()} 第二代強化版`;
  }

  public triggerBrakes(): string {
    return `${super.triggerBrakes()} 的無敵改良版`;
  }
}



class ExampleEventDispatcher extends egret.EventDispatcher{
    public constructor(){
        super();
    }
    public dispatchEventWith(eventName:string){
        super.dispatchEvent(new egret.Event(eventName));
    } 
}