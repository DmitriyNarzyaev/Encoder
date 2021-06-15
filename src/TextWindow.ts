import Container = PIXI.Container;

export default class TextWindow extends Container {
	private _textWindow:PIXI.Text;

	constructor(text:string, color:number, mainWidth:number) {
		super();
        let displayWidth:number = mainWidth - (mainWidth/10);
		this.initialText(displayWidth, text);
		this.initialTextWindowBorders(displayWidth, this._textWindow.height, color);
	}

	private initialTextWindowBorders(windowWidth:number, windowHeight:number, color:number):void {
		let displayBackground:PIXI.Graphics = new PIXI.Graphics;
		displayBackground
			.beginFill(color, 0)
			.lineStyle(3, color,)
			.drawRect(0, 0, windowWidth, windowHeight);
		this.addChild(displayBackground);
	}

	private initialText(textFieldWidth:number, text:string):void {
		const textGap:number = 5;
		this._textWindow = new PIXI.Text (
			' loading... ', {
				fontSize: 32,
				fontFamily: 'Times New Roman',
				fill: 0x000000,
				align: 'left',
            });
        this._textWindow.x = textGap*2;
        this._textWindow.style.wordWrap = true;
        this.addChild(this._textWindow);
		this._textWindow.text = text;
		this._textWindow.style.wordWrapWidth = textFieldWidth - textGap;
	}
}
