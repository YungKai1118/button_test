class GameScene extends eui.Component {

	private hole_0: Hole;
	private hole_list: Hole[];	//戳戳樂洞資料清單
	private win_n: number = 5;     //中獎個數 ,
	private nn: number = 25;         //戳戳樂個數
	private textinput_0: eui.TextInput;
	private button_0:eui.Button;

	public constructor() {
		super();

		this.once(eui.UIEvent.COMPLETE, this.uiComplete, this);
	}

	private uiComplete(e: eui.UIEvent): void {

		// console.log(this['hole_1']);      //Note_20211007: '' 和 "" 以及``都可以放入字串，其中``(back-tick)內可以包含 ${}
		// 		//learning ---------------------↓
		// 		console.log('string text line 1\n' + 'string text line 2');
		// 		console.log(`string text line 1
		// string text line 2`);
		// 		// "string text line 1
		// 		// string text line 2"
		// 		var a = 5;
		// 		var b = 10;
		// 		console.log('Fifteen is ' + (a + b) + ' and\nnot ' + (2 * a + b) + '.');
		// 		// "Fifteen is 15 and
		// 		// not 20."
		// 		var a = 5;
		// 		var b = 10;
		// 		console.log(`Fifteen is ${a + b} and
		// not ${2 * a + b}.`);
		// 		// "Fifteen is 15 and
		// 		// not 20."

		//reference: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals
		// 		//learning end------------------↑


		// console.log('hole_0.tocuh =' + this.hole_0.touch + ',init yet');   //hole.touch=0代表尚未init(初始化)  ,  777代表init完畢 , 1代表點擊事件發生
		//init  戳戳樂--------------------------------------------------------------------------

		this.hole_list = [];

		let win_temp: number[]
		win_temp = this.random_n();
		// console.log(win_n);

		console.log(typeof (this.textinput_0.text));

		for (let i = 0; i < this.nn; i++) {
			let temphole: Hole = new Hole;
			temphole = this[`hole_${i}`].init();      //初始化，掛上touchtap listener	
			this.hole_list.push(temphole);            //將物件資料存至hole_list內，以便後續維護或變更使用
			console.log(`hole_${i} is init complete`);
			this.hole_list[i].nth = i;                //使hole內部存取自己的編號，供內部使用
			this.hole_list[i].wn = win_temp;               //使hole內部存取中獎位置
		}

		this.button_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changewin, this);

	}

	private random_n(): number[] {
		let arr1: number[] = Array();
		for (let i = 0; i < this.nn; i++) {
			arr1.push(i);
		}
		arr1.sort(function () {
			return Math.random() - 0.5;
		})
		arr1.length = this.win_n;
		// console.log(arr1);
		return arr1;
	}

	private changewin(): void {
		this.hole_list.forEach((v) => {
			if (v.touch == 1) {
				this.button_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changewin, this);
				return;
			}
		});
		console.log('changing win numbers');
		this.win_n = parseInt(this.textinput_0.text);
		let win_temp: number[]
		win_temp = this.random_n();
		console.log(win_temp);
		for (let i = 0; i < this.nn; i++) {
			this.hole_list[i].wn = win_temp;               //使hole內部存取中獎位置
		}
	}
}