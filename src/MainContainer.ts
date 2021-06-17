import Container = PIXI.Container;
import { Graphics } from "pixi.js";
import TextWindow from "./TextWindow";
import Encoder from "./Encoder";
import { Button } from "./Button";

export default class MainContainer extends Container {
	public static readonly WIDTH:number = 1800;
	public static readonly HEIGHT:number = 800;
	private readonly _gap:number = 30;
	private _elementsColor:number = 0x007722;
	private _textText:string = ""
	private _targetTextWindow:TextWindow;
	private _encodeTextWindow:TextWindow;

	constructor() {
		super();
		this.initialBackground();
		this.initialTextWindows();
	}

	private initialBackground():void {
		let background: Graphics = new Graphics;
		background.beginFill(0x55ff88);
		background.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
		this.addChild(background);
	}

	private initialButtons(encodeText:string):void {
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
		let input = document.createElement('input');
		input.type = 'file';
		input.onchange = e => { 
			let file = e.target.files[0];			//FIXME!!!!!!!!!!!!!!!!!!!!!!!!!!
			let reader = new FileReader();
			reader.readAsText(file,'UTF-8');
			reader.onload = readerEvent => {
				var content = readerEvent.target.result;
				console.log( content );

				this.removeChild(this._targetTextWindow);
				this.removeChild(this._encodeTextWindow);
				this._textText = content.toString();
				this.initialTextWindows();
			}
		}
		input.click();
	}

	private saveButtonFunction(text:string):void {
		console.log("save button started");
		let blob = new Blob([text], {type: "text/plain"});
        let link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "code_text.txt");
        link.click();
	}

	private initialTextWindows():void {
		this._targetTextWindow = new TextWindow(this._textText, this._elementsColor, MainContainer.WIDTH);
		this._targetTextWindow.x = this._gap;
		this._targetTextWindow.y = this._gap;
		this.addChild(this._targetTextWindow);

		let encoder:Encoder = new Encoder;
		let encodeText = encoder.encodeText(this._textText);
		this._encodeTextWindow = new TextWindow(encodeText, this._elementsColor, MainContainer.WIDTH);
		this._encodeTextWindow.x = this._gap;
		this._encodeTextWindow.y = this._targetTextWindow.y + this._targetTextWindow.height + this._gap;
		this.addChild(this._encodeTextWindow);

		this.initialButtons(encodeText);
	}
}
