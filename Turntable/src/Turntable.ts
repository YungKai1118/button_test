class Turntalbe extends eui.Component{

    private turntableImage:eui.Image
    public constructor() {
        super();
        this.once(eui.UIEvent.COMPLETE, this.uiComplete, this)
    }

    private uiComplete(e: eui.UIEvent): void {
        

    }


}