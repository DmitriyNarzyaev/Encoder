var Container = PIXI.Container;
import { Graphics } from "pixi.js";
import TextWindow from "./TextWindow";
import Encoder from "./Encoder";
import { Button } from "./Button";
export default class MainContainer extends Container {
    constructor() {
        super();
        this._gap = 30;
        this._elementsColor = 0x007722;
        this._textText = "";
        this.initialBackground();
        this.initialTextWindows();
    }
    initialBackground() {
        let background = new Graphics;
        background.beginFill(0x55ff88);
        background.drawRect(0, 0, MainContainer.WIDTH, MainContainer.HEIGHT);
        this.addChild(background);
    }
    initialButtons(encodeText) {
        let buttonContainer = new PIXI.Container;
        this.addChild(buttonContainer);
        this.initialOpenFileButton(buttonContainer);
        this.initialSaveButton(buttonContainer, encodeText);
        buttonContainer.x = (MainContainer.WIDTH - buttonContainer.width) / 2;
        buttonContainer.y = MainContainer.HEIGHT - buttonContainer.height - this._gap;
    }
    initialOpenFileButton(buttonContainer) {
        let button;
        button = new Button("OPEN", this._elementsColor, () => { this.openFileButtonFunction(); }, MainContainer.WIDTH, MainContainer.HEIGHT);
        button.buttonMode = true;
        button.interactive = true;
        buttonContainer.addChild(button);
    }
    initialSaveButton(buttonContainer, text) {
        let button;
        button = new Button("SAVE", this._elementsColor, () => { this.saveButtonFunction(text); }, MainContainer.WIDTH, MainContainer.HEIGHT);
        button.buttonMode = true;
        button.interactive = true;
        button.x = button.width + this._gap;
        buttonContainer.addChild(button);
    }
    openFileButtonFunction() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            let file = e.target.files[0]; //FIXME!!!!!!!!!!!!!!!!!!!!!!!!!!
            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = readerEvent => {
                this.removeChild(this._targetTextWindow);
                this.removeChild(this._encodeTextWindow);
                var content = readerEvent.target.result;
                this._textText = content; //FIXME!!!!!!!!!!!!!!!!!!!!!!!!!!
                this.initialTextWindows();
            };
        };
        input.click();
    }
    saveButtonFunction(text) {
        console.log("save button started");
        let blob = new Blob([text], { type: "text/plain" });
        let link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "code_text.txt");
        link.click();
    }
    initialTextWindows() {
        this._targetTextWindow = new TextWindow(this._textText, this._elementsColor, MainContainer.WIDTH);
        this._targetTextWindow.x = this._gap;
        this._targetTextWindow.y = this._gap;
        this.addChild(this._targetTextWindow);
        let encoder = new Encoder;
        let encodeText = encoder.encodeText(this._textText);
        this._encodeTextWindow = new TextWindow(encodeText, this._elementsColor, MainContainer.WIDTH);
        this._encodeTextWindow.x = this._gap;
        this._encodeTextWindow.y = this._targetTextWindow.y + this._targetTextWindow.height + this._gap;
        this.addChild(this._encodeTextWindow);
        this.initialButtons(encodeText);
    }
}
MainContainer.WIDTH = 1800;
MainContainer.HEIGHT = 800;
//# sourceMappingURL=MainContainer.js.map