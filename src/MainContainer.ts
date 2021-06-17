import Container = PIXI.Container;
import { Graphics } from "pixi.js";
import TextWindow from "./TextWindow";
import Encoder from "./Encoder";
import { Button } from "./Button";

export default class MainContainer extends Container {
	public static readonly WIDTH:number = 1800;
	public static readonly HEIGHT:number = 800;
	private readonly _gap:number = 30;
	private _targetText:string;
	private _elementsColor:number = 0x007722;

	constructor(xhr:XMLHttpRequest) {
		super();
		this._targetText = xhr.responseText;
		this.initialBackground();
		this.initialTextWindows(this._targetText);
	}

	private initialBackground():void {
		let background: Graphics = new Graphics;
		background.beginFill(0x55ff88);
		background.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
		this.addChild(background);
	}

	private initialTextWindows(targetText:string):void {
		let targetTextDisplay = new TextWindow(targetText, this._elementsColor, MainContainer.WIDTH);
		targetTextDisplay.x = this._gap;
		targetTextDisplay.y = this._gap;
		this.addChild(targetTextDisplay);

		let encoder:Encoder = new Encoder;
		let encodeText = encoder.encodeText(targetText);
		let encodeTextDisplay = new TextWindow(encodeText, this._elementsColor, MainContainer.WIDTH);
		encodeTextDisplay.x = this._gap;
		encodeTextDisplay.y = targetTextDisplay.y + targetTextDisplay.height + this._gap;
		this.addChild(encodeTextDisplay);

		this.initialSaveButton(encodeText);
	}

	private initialSaveButton(text:string):void {
		let button:Button;
		button = new Button("СКАЧАТЬ", this._elementsColor, () => { this.saveButtonFunction(text);});
		button.buttonMode = true;
		button.interactive = true;
		button.x = (MainContainer.WIDTH - button.width)/2;
		button.y = MainContainer.HEIGHT - button.height - this._gap;
		this.addChild(button);
	}

	private saveButtonFunction(text:string):void {
		console.log("save button started");
		let blob = new Blob([text], {type: "text/plain"});
        let link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "code_text.txt");
        link.click();
	}
}
