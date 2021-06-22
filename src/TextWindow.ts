import Container = PIXI.Container;

export default class TextWindow extends Container {
	private _textWindow:PIXI.Text;
	private readonly _horizontalTextGap:number = 10;
	private readonly _VerticalTextGap:number = 4;

	constructor(text:string, color:number, windowWidth:number) {
		super();
		this.initialText(windowWidth, text);
		this.initialTextWindowBorders(windowWidth, (this._textWindow.height + this._VerticalTextGap*2), color);
	}

	private initialTextWindowBorders(windowWidth:number, windowHeight:number, color:number):void {
		let displayBackground:PIXI.Graphics = new PIXI.Graphics;
		displayBackground
			.beginFill(0xffffff, .5)
			.lineStyle(3, color)
			.drawRect(0, 0, windowWidth, windowHeight);
		this.addChild(displayBackground);
	}

	private initialText(textFieldWidth:number, text:string):void {
		this._textWindow = new PIXI.Text (
			' loading... ', {
				fontSize: 32,
				//leading:0,
				fontFamily: 'Times New Roman',
				fill: 0x000000,
				align: 'left'
            });
        this._textWindow.x = this._horizontalTextGap;
        this._textWindow.y = this._VerticalTextGap;
        this._textWindow.style.wordWrap = true;
        this.addChild(this._textWindow);
		this._textWindow.text = text;
		this._textWindow.style.wordWrapWidth = textFieldWidth - this._horizontalTextGap*2;
	}
}
