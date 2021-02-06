import Container = PIXI.Container;
import { Graphics } from "pixi.js";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 3000;
	public static readonly HEIGHT:number = 1500;

	constructor() {
		super();

		let plkdjfg: Graphics = new Graphics;
		plkdjfg.beginFill(0x00ff48);
		plkdjfg.drawRect(0, 0, Main_Container.WIDTH, Main_Container.HEIGHT);
		this.addChild(plkdjfg);
	}
}