import Container = PIXI.Container;
import { Graphics, IPoint } from "pixi.js";
import TextWindow from "./TextWindow";
import Encoder from "./Encoder";
import { Button } from "./Button";
import { Scrollbar } from "./Scrollbar";
import InteractionEvent = PIXI.interaction.InteractionEvent;

export default class MainContainer extends Container {
	public static readonly WIDTH:number = 1800;
	public static readonly HEIGHT:number = 800;
	private readonly _gap:number = 20;
	private _elementsColor:number = 0x007722;
	private _textText:string = "";  //  --/r  /n
	private _encodeText:string = "";  //  --/r  /n
	private _textWindowsContainer:PIXI.Container
	private _targetTextWindow:TextWindow;
	private _encodeTextWindow:TextWindow;
	private _buttonWidth:number = MainContainer.WIDTH / 10;
	private _buttonHeight:number = MainContainer.HEIGHT / 20;
	private _buttonRegionHeight:number = this._buttonHeight + this._gap*2;	//FIXME поправить - (MainContainer.HEIGHT/20)
	private _scrollbar:Scrollbar;
	private _scrollbarWidth:number = 20;
	private _scrollbarHeight:number = MainContainer.HEIGHT - this._buttonRegionHeight - this._gap*2;
	private _buttonsIsAdded:boolean = false;
	private _scrollbarTouchDownY:number;
	private _textContainerTouchDownY:number;
	private _percentage:number;
	private _wheelHandler:()=>void;

	constructor() {
		super();
		this.initialBackground();
		this.initialTextWindows();
		this._wheelHandler = MainContainer.addEvent(document, "wheel", this.movingContentForWheel.bind(this));
	}

	private initialBackground():void {
		let background: Graphics = new Graphics;
		background.beginFill(0x55ff88);
		background.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
		this.addChild(background);
	}

	private initialButtons():void {
		const buttonRegion:PIXI.Graphics = new PIXI.Graphics;
		buttonRegion
			.beginFill(this._elementsColor, .5)
			.drawRect(0, 0, MainContainer.WIDTH, this._buttonRegionHeight);
		this.addChild(buttonRegion);
		buttonRegion.y = MainContainer.HEIGHT - buttonRegion.height;

		let buttonContainer:PIXI.Container = new PIXI.Container;
		this.addChild(buttonContainer);
		this.initialOpenFileButton(buttonContainer);
		this.initialSaveButton(buttonContainer);
		buttonContainer.x = (MainContainer.WIDTH - buttonContainer.width)/2;
		buttonContainer.y = MainContainer.HEIGHT - buttonContainer.height - this._gap;
		this._buttonsIsAdded = true;
	}

	private initialOpenFileButton(buttonContainer:PIXI.Container):void {
		let button:Button;
		button = new Button(
			"OPEN",
			this._elementsColor,
			() => { this.openFileButtonFunction();},
			this._buttonWidth,
			this._buttonHeight
		);
		button.buttonMode = true;
		button.interactive = true;
		buttonContainer.addChild(button);
	}

	private initialSaveButton(buttonContainer:PIXI.Container):void {
		let button:Button;
		button = new Button(
			"SAVE",
			this._elementsColor,
			() => { this.saveButtonFunction();},
			this._buttonWidth,
			this._buttonHeight
			);
		button.buttonMode = true;
		button.interactive = true;
		button.x = button.width + this._gap;
		buttonContainer.addChild(button);
	}

	private openFileButtonFunction():void {	
		let input = document.createElement('input');
		input.type = 'file';
		input.onchange = e => { 
			let file = (e.target as HTMLInputElement).files[0];
			let reader = new FileReader();
			reader.readAsText(file,'UTF-8');
			reader.onload = readerEvent => {
				this._textWindowsContainer.removeChild(this._targetTextWindow);
				this._textWindowsContainer.removeChild(this._encodeTextWindow);
				this.removeChild(this._scrollbar);
				var content:string = readerEvent.target.result as string;
				this._textText = content;
				this.initialTextWindows();
			}
		}
		input.click();
	}

	private saveButtonFunction():void {
		console.log("save button started");
		let blob = new Blob([this._encodeText], {type: "text/plain"});
        let link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "code_text.txt");
        link.click();
		console.log("text" + this._encodeText);
	}

	private initialScrollbar(contentHeight:number):void {
		const sliderHeight:number = this._scrollbarHeight
			* ((MainContainer.HEIGHT - this._buttonRegionHeight)
			/ contentHeight);
		this._scrollbar = new Scrollbar(
			this._scrollbarWidth,
			this._scrollbarHeight,
			sliderHeight,
			this._elementsColor
		);
		this._scrollbar.x = MainContainer.WIDTH - this._scrollbar.width - this._gap;
		this._scrollbar.y = this._gap;
		this.addChild(this._scrollbar);

		this._scrollbar.slider
			.addListener('pointerdown', this.scrollbarOnDragStart, this)
			.addListener('pointerup', this.scrollbarOnDragEnd, this)
			.addListener('pointerupoutside', this.scrollbarOnDragEnd, this)
	}

	private scrollbarOnDragStart(event:InteractionEvent):void {
		this._scrollbarTouchDownY = this._scrollbar.slider.toLocal(event.data.global).y;
		this._scrollbar.slider.addListener('pointermove', this.scrollbarOnDragMove, this);
		this._scrollbar.slider.tint =  0x80baf3;
	}

	private scrollbarOnDragEnd():void {
		this._scrollbarTouchDownY = 0;
		this._scrollbar.slider.removeListener('pointermove', this.scrollbarOnDragMove, this);
		this._scrollbar.slider.tint =  0xffffff;
	}

	private scrollbarOnDragMove(event:InteractionEvent):void {
		const newPosition:IPoint = event.data.getLocalPosition(this._scrollbar);
		this._scrollbar.slider.y = newPosition.y - this._scrollbarTouchDownY;
		this.sliderYLimit();
		this.movingContentForScrollbardrag();
	}

	private sliderYLimit():void {
		let scrollbarLimitMin:number = 0;
		let scrollbarLimitMax:number = MainContainer.HEIGHT - this._buttonRegionHeight
			- this._gap*2 - this._scrollbar.slider.height;
		if (this._scrollbar.slider.y <= scrollbarLimitMin) {
			this._scrollbar.slider.y = scrollbarLimitMin;
		}
		if (this._scrollbar.slider.y >= scrollbarLimitMax) {
			this._scrollbar.slider.y = scrollbarLimitMax;
		}

		let textWindowsLimitMin:number = -this._textWindowsContainer.height
			+this._scrollbarHeight + this._gap;
		let textWindowsLimitMax:number = this._gap;
		if (this._textWindowsContainer.y <= textWindowsLimitMin) {
			this._textWindowsContainer.y = textWindowsLimitMin;	
		}
		if (this._textWindowsContainer.y >= textWindowsLimitMax) {
			this._textWindowsContainer.y = textWindowsLimitMax;	
		}
		console.log(this._textWindowsContainer.y)
	}

	private movingContentForScrollbardrag():void {
		let workingLength:number = this._scrollbarHeight - this._scrollbar.slider.height;
		this._percentage = this._scrollbar.slider.y / workingLength;
		console.log(this._percentage);

		this._textWindowsContainer.y = (
			(this._textWindowsContainer.height - this._scrollbarHeight)
			* -this._percentage) + this._gap;
	}

	private movingScrollbarForContentdrag():void {
		let workingLength:number = this._scrollbarHeight - this._textWindowsContainer.height;
		this._percentage = (this._textWindowsContainer.y - this._gap) / workingLength;
		console.log(this._percentage);

		this._scrollbar.slider.y = (
			(this._scrollbarHeight - this._scrollbar.slider.height)
			* this._percentage
		);
		this.sliderYLimit();
	}

	private movingContentForWheel(wheelEvent:WheelEvent):void {
		const delta:number = 20*(wheelEvent.deltaY > 0 ? 1 : -1);
		if (wheelEvent.deltaY > 0){
			this._textWindowsContainer.y -= Math.abs(delta);
		} else {
			this._textWindowsContainer.y += Math.abs(delta);
		}
		this.sliderYLimit();
		this.movingScrollbarForContentdrag();
	}

	private initialTextWindows():void {
		this._textWindowsContainer = new PIXI.Container;
		this.addChild(this._textWindowsContainer)

		let windowsMask:PIXI.Graphics = new PIXI.Graphics;
		windowsMask
			.beginFill(0xFF3300)
			.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT - this._buttonRegionHeight);
		this.addChild(windowsMask);
		this._textWindowsContainer.mask = windowsMask;

		const windowWidth:number = MainContainer.WIDTH - this._scrollbarWidth - this._gap*3;
		this._targetTextWindow = new TextWindow(this._textText, this._elementsColor, windowWidth);
		this._targetTextWindow.x = this._gap;
		this._textWindowsContainer.addChild(this._targetTextWindow);

		let encoder:Encoder = new Encoder;
		this._encodeText = encoder.decodeText(this._textText);
		this._encodeTextWindow = new TextWindow(this._encodeText, this._elementsColor, windowWidth);
		this._encodeTextWindow.x = this._gap;
		this._encodeTextWindow.y = this._targetTextWindow.y + this._targetTextWindow.height + this._gap;
		this._textWindowsContainer.addChild(this._encodeTextWindow);
		this._textWindowsContainer.y = this._gap;

		if (this._buttonsIsAdded == false) {
			this.initialButtons();
		}

		if (this._textWindowsContainer.height > (MainContainer.HEIGHT - this._buttonRegionHeight)) {
			this.initialScrollbar(this._textWindowsContainer.height);
		}

		this._textWindowsContainer.interactive = true;
		this._textWindowsContainer.buttonMode = true;

		this._textWindowsContainer
			.addListener('pointerdown', this.textOnDragStart, this)
			.addListener('pointerup', this.textOnDragEnd, this)
			.addListener('pointerupoutside', this.textOnDragEnd, this);
	}

	private textOnDragStart(event:InteractionEvent):void {
		this._textContainerTouchDownY = this._textWindowsContainer.toLocal(event.data.global).y;
		this._textWindowsContainer.addListener('pointermove', this.textOnDragMove, this);
	}

	private textOnDragEnd():void {
		this._textContainerTouchDownY = 0;
		this._textWindowsContainer.removeListener('pointermove', this.textOnDragMove, this);
	}

	private textOnDragMove(event:InteractionEvent):void {
		const newPosition:IPoint = event.data.getLocalPosition(this);
		this._textWindowsContainer.y = newPosition.y - this._textContainerTouchDownY;
		this.movingScrollbarForContentdrag();
	}

	private static addEvent(object:any, type:string, callback:() => void):() => void {
		if (object.addEventListener) {
			object.addEventListener(type, callback, false);
		} else if (object.attachEvent) {
			object.attachEvent("on" + type, callback);
		} else {
			object["on" + type] = callback;
		}
		return callback;
	}

	private static removeEvent(object:any, type:string, callback:() => void) {
		if (object == null || typeof(object) === "undefined") {
			return;
		}
		if (object.removeEventListener) {
			object.removeEventListener(type, callback, false);
		} else if (object.detachEvent) {
			object.detachEvent("on" + type, callback);
		} else {
			object["on" + type] = null;
		}
	}
}
