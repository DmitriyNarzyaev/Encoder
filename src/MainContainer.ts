import Container = PIXI.Container;
import { Graphics } from "pixi.js";
import TextWindow from "./TextWindow";
import Encoder from "./Encoder";

export default class MainContainer extends Container {
	public static readonly WIDTH:number = 1800;
	public static readonly HEIGHT:number = 800;

	constructor(xhr:XMLHttpRequest) {
		super();
		this.initialBackground();
		this.initialTextWindow(xhr);
	}

	private initialBackground():void {
		let background: Graphics = new Graphics;
		background.beginFill(0x55ff88);
		background.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
		this.addChild(background);
	}

	private initialTextWindow(xhr:XMLHttpRequest):void {
		let gap:number = 30;
		let text:string = xhr.responseText;
		let targetTextDisplay = new TextWindow(text, 0x008833, MainContainer.WIDTH);
		targetTextDisplay.x = gap;
		targetTextDisplay.y = gap;
		this.addChild(targetTextDisplay);

		let encoder:Encoder = new Encoder;
		let encodeText = encoder.encodeText(text);
		let encodeTextDisplay = new TextWindow(encodeText, 0x880033, MainContainer.WIDTH);
		encodeTextDisplay.x = gap;
		encodeTextDisplay.y = targetTextDisplay.y + targetTextDisplay.height + gap;
		this.addChild(encodeTextDisplay);
	}
}
