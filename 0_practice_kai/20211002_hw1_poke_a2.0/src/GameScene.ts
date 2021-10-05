class GameScene extends eui.Component {

	private item_0: eui.Image;

	private list: eui.Image[];

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	private uiComplete(e: eui.UIEvent): void {

		// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.test, this);

		this.list = [];
		for (let i: number = 0; i < 9; ++i) {
			let img: eui.Image = this[`item_${i}`];
			img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.test, this);
			this.list.push(img);
		}
	}

	private test(e: egret.TouchEvent): void {
		let image: eui.Image = e.target;
		image.texture = RES.getRes('w4_png');
	}
}