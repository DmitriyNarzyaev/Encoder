var Container = PIXI.Container;
export default class TextWindow extends Container {
    constructor(text, color, mainWidth) {
        super();
        this._horizontalTextGap = 10;
        this._VerticalTextGap = 4;
        let displayWidth = mainWidth - (mainWidth / 10);
        this.initialText(displayWidth, text);
        this.initialTextWindowBorders(displayWidth, (this._textWindow.height + this._VerticalTextGap * 2), color);
    }
    initialTextWindowBorders(windowWidth, windowHeight, color) {
        let displayBackground = new PIXI.Graphics;
        displayBackground
            .beginFill(color, 0)
            .lineStyle(3, color)
            .drawRect(0, 0, windowWidth, windowHeight);
        this.addChild(displayBackground);
    }
    initialText(textFieldWidth, text) {
        let windowFontSize = 32;
        this._textWindow = new PIXI.Text(' loading... ', {
            fontSize: windowFontSize,
            lineHeight: windowFontSize / 2,
            fontFamily: 'Times New Roman',
            fill: 0x000000,
            align: 'left'
        });
        this._textWindow.x = this._horizontalTextGap;
        this._textWindow.y = this._VerticalTextGap;
        this._textWindow.style.wordWrap = true;
        this.addChild(this._textWindow);
        this._textWindow.text = text;
        this._textWindow.style.wordWrapWidth = textFieldWidth - this._horizontalTextGap * 2;
    }
}
//# sourceMappingURL=TextWindow.js.map