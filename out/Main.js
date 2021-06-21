var Rectangle = PIXI.Rectangle;
var Application = PIXI.Application;
var Container = PIXI.Container;
import MainContainer from "./MainContainer";
import Global from "./Global";
export class Main extends Container {
    constructor(canvasId) {
        super();
        this.initSize();
        this.initPixiApp(canvasId);
        this.startOfTheProgram();
        //this.xhrLoader();
    }
    // private xhrLoader():void {
    // 	this._xhr = new XMLHttpRequest();
    // 	this._xhr.responseType = "text";
    // 	this._xhr.open("GET", "text.txt", true);
    // 	this._xhr.onreadystatechange = () => {
    // 		if (this._xhr.readyState === 4) {
    // 			if (this._xhr.status === 200) {
    // 				this.startOfTheProgram();
    // 			} else {
    // 				console.log("ERROR");
    // 			}
    // 		}
    // 	};
    // 	this._xhr.send();
    // }
    startOfTheProgram() {
        this.initMainContainer();
        window.onresize = () => { this.resize(); };
        this.resize();
    }
    initSize() {
        this._size = new Rectangle();
    }
    initPixiApp(canvasId) {
        Global.PIXI_APP = new Application({
            backgroundColor: 0x000000,
            antialias: true,
            view: document.getElementById(canvasId),
            // needed to avoid troubles with invisible fonts on some Android devices
            resolution: ((devicePixelRatio || 1) < 2) ? 1 : 2,
        });
        Global.PIXI_APP.stage.addChild(this);
    }
    initMainContainer() {
        this._mainContainer = new MainContainer();
        this._mainContainer.width = window.innerWidth;
        this._mainContainer.height = window.innerHeight;
        Global.PIXI_APP.stage.addChild(this._mainContainer);
    }
    resize() {
        this.refreshSize();
        this.alignPixiApp();
        this.alignContainer();
    }
    refreshSize() {
        if (window.outerHeight !== 0) {
            this._size.width = window.innerWidth;
            this._size.height = window.innerHeight;
        }
        else { // needed to avoid some iOS troubles
            this._size.width = document.body.scrollWidth;
            this._size.height = document.body.scrollHeight;
        }
    }
    alignPixiApp() {
        Global.PIXI_APP.renderer.view.style.width = this._size.width + "px";
        Global.PIXI_APP.renderer.view.style.height = this._size.height + "px";
        Global.PIXI_APP.renderer.resize(this._size.width, this._size.height);
    }
    alignContainer() {
        const scaleByWidth = this._size.width / MainContainer.WIDTH;
        const scaleByHeight = this._size.height / MainContainer.HEIGHT;
        this._mainContainer.scale.x = this._mainContainer.scale.y = Math.min(scaleByWidth, scaleByHeight);
        this._mainContainer.x = (this._size.width - MainContainer.WIDTH * this._mainContainer.scale.x) / 2;
        this._mainContainer.y = (this._size.height - MainContainer.HEIGHT * this._mainContainer.scale.y) / 2;
    }
}
Main.BORDER_SIZE = 200;
//# sourceMappingURL=Main.js.map