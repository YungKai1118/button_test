class Main extends egret.DisplayObjectContainer {


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);


    }

    private onAddToStage(event: egret.Event) {
        egret.log("start AAA");

        const redCar = new Car('紅色');

        console.log(redCar.getDescription()); // 我是車子 - 紅色
        console.log(redCar.triggerBrakes()); // 用機密方式煞車帥一波

        // 敵對廠商覺得太帥，買來解體，想偷看煞車方式就會出錯
        // 因為 brakes 是私有的，看不到裡面的值
        // console.log(redCar.brakes);

        const greenCar = new Car2('綠色');

        console.log(greenCar.getDescription()); // 我是車子 - 綠色 第二代強化版
        console.log(greenCar.triggerBrakes()); // 用了商業機密的煞車方式 的無敵改良版

        const newVersion = new VersionClass('紅色的', 2);
        console.log(newVersion);


        // ABOUT protected
        const patentInstance = new ParentClass();
        console.log(patentInstance);
        // patentInstance.genealogy; // 會錯誤
        const sonInstance = new SonClass();
        sonInstance.getGenealogy(); // 正確讀取
        console.log(sonInstance);
        // sonInstance.genealogy; // 仍舊會出錯


    }

}

class ColorClass {
    color: string;

    constructor(color: string) {
        this.color = color;
    }
}

class VersionClass extends ColorClass {
    version: number

    constructor(color: string, version: number) {
        // 在這裡執行的 super 等同於父類別的 constructor
        super(color);
        this.version = version;
    }
}

class ParentClass {
    protected genealogy: string;

    constructor() {
        this.genealogy = 'Only family read!';
    }
}
class SonClass extends ParentClass {
    getGenealogy(): string {
        return this.genealogy; // 不會有錯，因為在子類別可以讀取到 protected 的 property
    }
}