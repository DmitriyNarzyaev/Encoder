import { Container } from "pixi.js";

export class Scrollbar extends Container {
    private _scrollingRegion:PIXI.Graphics;
    public slider:PIXI.Graphics;

	constructor(scrollbarWidth:number, scrollbarHeight:number, scrollbarColor:number) {
		super();
	    this.initialScrollingRegion(
            scrollbarWidth,
            scrollbarHeight,
            scrollbarColor
        );
	    this.initialSlider(scrollbarColor);
    }

    private initialScrollingRegion(scrollingRegionWidth:number, scrollingRegionHeight:number, color:number):void {
        this._scrollingRegion = new PIXI.Graphics;
        this._scrollingRegion
            .beginFill(color, .5)
            .drawRect(0, 0, scrollingRegionWidth, scrollingRegionHeight);
        this.addChild(this._scrollingRegion);
    }

    private initialSlider(color:number):void {
        this.slider = new PIXI.Graphics;
        this.slider
            .beginFill(color)
            .drawRect(0, 0, this._scrollingRegion.width, 50);
        this.slider.x = this._scrollingRegion.x;
        this.slider.y = this._scrollingRegion.y;
        this.addChild(this.slider);
    }
}