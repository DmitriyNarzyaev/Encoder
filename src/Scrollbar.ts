import { Container } from "pixi.js";

export class Scrollbar extends Container {
    public slider:PIXI.Graphics;
    private _scrollingRegion:PIXI.Graphics;

	constructor(scrollbarWidth:number, scrollbarHeight:number, sliderHeight:number, scrollbarColor:number) {
		super();
	    this.initialScrollingRegion(
            scrollbarWidth,
            scrollbarHeight,
            scrollbarColor
        );
	    this.initialSlider(
            sliderHeight,
            scrollbarColor
        );
    }

    private initialScrollingRegion(scrollingRegionWidth:number, scrollingRegionHeight:number, color:number):void {
        this._scrollingRegion = new PIXI.Graphics;
        this._scrollingRegion
            .beginFill(color, .5)
            .drawRect(0, 0, scrollingRegionWidth, scrollingRegionHeight);
        this.addChild(this._scrollingRegion);
    }

    private initialSlider(sliderHeight:number, color:number):void {
        this.slider = new PIXI.Graphics;
        this.slider
            .beginFill(color)
            .drawRect(0, 0, this._scrollingRegion.width, sliderHeight);
        this.slider.x = this._scrollingRegion.x;
        this.slider.y = this._scrollingRegion.y;
        this.slider.interactive = true;
        this.slider.buttonMode = true;
        this.addChild(this.slider);
    }
}