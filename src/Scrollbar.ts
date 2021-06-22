import { Container } from "pixi.js";

export class Scrollbar extends Container {
    private _scrollingRegion:PIXI.Graphics;
    public slider:PIXI.Graphics;

	constructor(scrollbarHeight:number) {
		super();
        let scrollingRegionWidth:number = 20;
        let scrollingRegionHeight:number = scrollbarHeight;

	    this.initialScrollingRegion(scrollingRegionWidth, scrollingRegionHeight);
	    this.initialSlider();
    }

    private initialScrollingRegion(scrollingRegionWidth:number, scrollingRegionHeight:number):void {
        this._scrollingRegion = new PIXI.Graphics;
        this._scrollingRegion
            .beginFill(0xddffdd)
            .drawRect(0, 0, scrollingRegionWidth, scrollingRegionHeight);
        this.addChild(this._scrollingRegion);
    }

    private initialSlider():void {
        this.slider = new PIXI.Graphics;
        this.slider
            .beginFill(0x99cc99)
            .drawRect(0, 0, this._scrollingRegion.width, 50);
        this.slider.x = this._scrollingRegion.x;
        this.slider.y = this._scrollingRegion.y;
        this.addChild(this.slider);
    }
}