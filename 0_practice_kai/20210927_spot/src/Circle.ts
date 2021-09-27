class Circle2 extends egret.Sprite {

    public constructor(cx:number,cy:number,cr:number){
        super();
        // this.init(cx,cy,cr);
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

}