import Graphics = PIXI.Graphics;
import MainContainer from "./MainContainer";

export class Button extends Graphics {
	private readonly _callback:()=>void;

	constructor(text:string, color:number, callback:()=>void = null) {
		super();
		let buttonWidth:number = MainContainer.WIDTH/10;
		let buttonHeight:number = MainContainer.HEIGHT/20;
		this._callback = callback;
        
		const button:PIXI.Graphics = new PIXI.Graphics();
		button.beginFill(color, 1);
		button.drawRoundedRect(0, 0, buttonWidth, buttonHeight, buttonHeight/3);
		button.endFill();
		button.interactive = true;
		button.buttonMode = true;
		this.addChild(button);

		let buttonName = new PIXI.Text (
			' ',
			{
				fontFamily:'Times New Roman',
				fontWeight:'bold',
				fontSize:30,
				fill:'#ffffff',
				align:'center',
				wordWrap:true,
				wordWrapWidth:60,
		});

		buttonName.x = button.width / 2;
		buttonName.y = button.height / 2 - buttonName.height / 2;
		buttonName.anchor.x = 0.5;
		button.addChild(buttonName);
		buttonName.text = text;
		if (callback) {
			this.addListener('pointertap', this.pointerTabHandler, this);
		}
	}

	private pointerTabHandler():void {
		this._callback();
	}
}