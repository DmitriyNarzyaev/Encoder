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
		this.initialElements(this._targetText);
	}

	private initialBackground():void {
		let background: Graphics = new Graphics;
		background.beginFill(0x55ff88);
		background.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
		this.addChild(background);
	}

	private initialElements(targetText:string):void {
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

		let buttonContainer:PIXI.Container = new PIXI.Container;
		this.addChild(buttonContainer);
		this.initialOpenFileButton(buttonContainer);
		this.initialSaveButton(buttonContainer, encodeText);
		buttonContainer.x = (MainContainer.WIDTH - buttonContainer.width)/2;
		buttonContainer.y = MainContainer.HEIGHT - buttonContainer.height - this._gap;
	}

	private initialOpenFileButton(buttonContainer:PIXI.Container):void {
		let button:Button;
		button = new Button("OPEN", this._elementsColor, () => { this.openFileButtonFunction();});
		button.buttonMode = true;
		button.interactive = true;
		buttonContainer.addChild(button);
	}

	private initialSaveButton(buttonContainer:PIXI.Container, text:string):void {
		let button:Button;
		button = new Button("SAVE", this._elementsColor, () => { this.saveButtonFunction(text);});
		button.buttonMode = true;
		button.interactive = true;
		button.x = button.width + this._gap;
		buttonContainer.addChild(button);
	}

	private openFileButtonFunction():void {

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
