import Container = PIXI.Container;
import { Graphics } from "pixi.js";

export default class MainContainer extends Container {
	public static readonly WIDTH:number = 1800;
	public static readonly HEIGHT:number = 800;

	constructor() {
		super();
		this.initialBackground();
	}

	private initialBackground():void {
		let background: Graphics = new Graphics;
		background.beginFill(0x55ff88);
		background.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
		this.addChild(background);
	}
}
