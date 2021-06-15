import Container = PIXI.Container;
import { Graphics } from "pixi.js";
import TextWindow from "./TextWindow";

export default class MainContainer extends Container {
	public static readonly WIDTH:number = 1800;
	public static readonly HEIGHT:number = 800;

	constructor() {
		super();
		this.initialBackground();
		this.initialTextWindow();
	}

	private initialBackground():void {
		let background: Graphics = new Graphics;
		background.beginFill(0x55ff88);
		background.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
		this.addChild(background);
	}

	private initialTextWindow():void {
		let gap:number = 30;
		let text:string = "123 abc";
		let textWindow = new TextWindow(text, 0x008833, MainContainer.WIDTH);
		textWindow.x = gap;
		textWindow.y = gap;
		this.addChild(textWindow);
	}
}
