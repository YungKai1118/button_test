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