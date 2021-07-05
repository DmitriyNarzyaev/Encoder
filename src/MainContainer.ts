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

	private _touchDownY:number;

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
		const buttonRegion:PIXI.Graphics = new PIXI.Graphics;
		buttonRegion
			.beginFill(this._elementsColor, .5)
			.drawRect(0, 0, MainContainer.WIDTH, this._buttonRegionHeight);
		this.addChild(buttonRegion);
		buttonRegion.y = MainContainer.HEIGHT - buttonRegion.height;

		let buttonContainer:PIXI.Container = new PIXI.Container;
		this.addChild(buttonContainer);
		this.initialOpenFileButton(buttonContainer);
		this.initialSaveButton(buttonContainer, encodeText);
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

	private initialSaveButton(buttonContainer:PIXI.Container, text:string):void {
		let button:Button;
		button = new Button(
			"SAVE",
			this._elementsColor,
			() => { this.saveButtonFunction(text);},
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

	private saveButtonFunction(text:string):void {
		console.log("save button started");
		let blob = new Blob([text], {type: "text/plain"});
        let link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "code_text.txt");
        link.click();
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
			.addListener('pointerdown', this.onDragStart, this)
			.addListener('pointerup', this.onDragEnd, this)
			.addListener('pointerupoutside', this.onDragEnd, this)
	}

	private onDragStart(event:InteractionEvent):void {
		this._touchDownY = this._scrollbar.slider.toLocal(event.data.global).y;
		this._scrollbar.slider.addListener('pointermove', this.onDragMove, this);
		this._scrollbar.slider.tint =  0x80baf3;
	}

	private onDragEnd():void {
		this._touchDownY = 0;
		this._scrollbar.slider.removeListener('pointermove', this.onDragMove, this);
		this._scrollbar.slider.tint =  0xffffff;
	}

	private onDragMove(event:InteractionEvent):void {
		const newPosition:IPoint = event.data.getLocalPosition(this._scrollbar);
		this._scrollbar.slider.y = newPosition.y - this._touchDownY;
		this.sliderYLimit();
		this.movingContent();
	}

	private sliderYLimit():void {
		if (this._scrollbar.slider.y <= (0)) {
			this._scrollbar.slider.y = 0;
		}
		if (this._scrollbar.slider.y >= MainContainer.HEIGHT - this._buttonRegionHeight - this._gap*2 - this._scrollbar.slider.height) {
			this._scrollbar.slider.y = MainContainer.HEIGHT - this._buttonRegionHeight - this._gap*2 - this._scrollbar.slider.height;
		}
	}

	private movingContent():void {
		this._textWindowsContainer.y = this._gap - (this._scrollbar.slider.y) * (
			(this._textWindowsContainer.height - this._scrollbarHeight)
			/ (this._scrollbarHeight - this._scrollbar.slider.height)
		);
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
		let encodeText = encoder.encodeText(this._textText);
		this._encodeTextWindow = new TextWindow(encodeText, this._elementsColor, windowWidth);
		this._encodeTextWindow.x = this._gap;
		this._encodeTextWindow.y = this._targetTextWindow.y + this._targetTextWindow.height + this._gap;
		this._textWindowsContainer.addChild(this._encodeTextWindow);
		this._textWindowsContainer.y = this._gap;

		if (this._buttonsIsAdded == false) {
			this.initialButtons(encodeText);
		}

		if (this._textWindowsContainer.height > (MainContainer.HEIGHT - this._buttonRegionHeight)) {
			this.initialScrollbar(this._textWindowsContainer.height);
		}
	}
}
