class GameScene extends eui.Component {

	private item_0: eui.Image;
	private item_9: eui.Image;
	// private list: euiImage_getinf[];
	private list: eui.Image[];
	private random_number: number[];
	private win_n: number = 2;  //中獎個數，初始化為2，使用者可輸入1~4

	private txtinput_0: eui.TextInput;

	private comp_0: MyComponent;
	private comp_1: MyComponent;
	private comp_2: MyComponent;

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);pr
	}

	private uiComplete(e: eui.UIEvent): void {




		// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.test, this);
		// console.log(this);
		this.list = [];
		for (let i: number = 0; i < 9; ++i) {
			// console.log(`item_${i}`);
			let img: eui.Image = this[`item_${i}`];
			// let kaiControl = new KaiControl(img)
			// this.list[i].arr_index=i;
			// console.log(this.list[i].arr_index);
			this.list.push(img);

			this.list[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this.list[i].name = "list_index_" + i.toString();
		}
		
		this.item_9.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:TouchEvent)=>{this.comp_0.hide();},this);
		// this.item_9.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:TouchEvent)=>{this.comp_0.$children[0] = RES.getRes('w4_png')},this);


		this.random_number = this.random_n();  //產生兩個不重複隨機數，作為中獎位置


	}

	private random_n(): number[] {
		let arr1: number[] = Array();
		for (let i = 0; i < 9; i++) {
			arr1.push(i);
		}
		arr1.sort(function () {
			return Math.random() - 0.5;
		})
		arr1.length = this.win_n;
		console.log(arr1);
		return arr1;
	}

	private onTouch(e: egret.TouchEvent): void {
		let image: eui.Image = e.target;
		let nn = parseInt(image.name.substr(11));
		let win_cheack: boolean = false;

		// console.log("點擊目標編號:"+nn);
		let wn: number = this.random_number.length;
		for (let i = 0; i < wn; i++) {
			if (this.random_number[i] == nn) {  //抽中
				image.texture = RES.getRes('w4_png');
				win_cheack = true;  //兩組中獎號碼，中獎後跳出if

			}
			else if (win_cheack == false) {         //未抽中
				image.texture = RES.getRes('p6_png');;

			}
		}
		image.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

		// let image: eui.Image = e.currentTarget;
		// image.bitmapData = RES.getRes('w4_png');
	}
}