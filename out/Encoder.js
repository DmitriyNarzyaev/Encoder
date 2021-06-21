var Container = PIXI.Container;
export default class Encoder extends Container {
    constructor() {
        super();
        this.targetSymbols = [
            "а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н",
            "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь",
            "э", "ю", "я", "(", ")", "-", "—"
        ];
        this.codeSymbols = [
            "Ⴉ", "Ⴐ", "Ⴁ", "Ⴜ", "Ⴔ", "Ⴢ", "Ⴂ", "Ⴖ", "Ⴆ", "Ⴎ", "Ⴍ", "Ⴇ", "Ⴈ", "Ⴗ", "Ⴓ",
            "Ⴣ", "Ⴒ", "Ⴛ", "Ⴝ", "Ⴙ", "Ⴃ", "Ⴋ", "Ⴞ", "Ⴟ", "Ⴀ", "Ⴚ", "Ⴊ", "Ⴌ", "Ⴅ", "Ⴑ",
            "Ⴕ", "Ⴡ", "Ⴏ", "Ⴘ", "Ⴄ", "Ⴠ", "Ⴤ",
        ];
    }
    encodeText(text) {
        let encodeText = "";
        for (let iterator = 0; iterator < text.length; iterator++) {
            let targetLetter = text[iterator];
            encodeText += this.encodeLetter(targetLetter);
        }
        return encodeText;
    }
    encodeLetter(letter) {
        let codeLetter;
        letter = letter.toLowerCase();
        let charIndex = this.targetSymbols.indexOf(letter);
        if (charIndex != -1) {
            codeLetter = this.codeSymbols[charIndex];
        }
        else {
            codeLetter = letter;
        }
        return codeLetter;
    }
}
//# sourceMappingURL=Encoder.js.map