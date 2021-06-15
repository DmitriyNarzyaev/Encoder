import Container = PIXI.Container;

export default class Encoder extends Container {
private targetSymbols:string[] = [
		"а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н",
		"о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь",
		"э", "ю", "я", "(", ")", "-", "—"
	];
	private codeSymbols:string[] = [
		"Ⴉ", "Ⴐ", "Ⴁ", "Ⴜ", "Ⴔ", "Ⴢ", "Ⴂ", "Ⴖ", "Ⴆ", "Ⴎ", "Ⴍ", "Ⴇ", "Ⴈ", "Ⴗ", "Ⴓ",
		"Ⴣ", "Ⴒ", "Ⴛ", "Ⴝ", "Ⴙ", "Ⴃ", "Ⴋ", "Ⴞ", "Ⴟ", "Ⴀ", "Ⴚ", "Ⴊ", "Ⴌ", "Ⴅ", "Ⴑ",
		"Ⴕ", "Ⴡ", "Ⴏ", "Ⴘ", "Ⴄ", "Ⴠ", "Ⴤ",
		//"Ⴧ", "Ⴥ",
	];

	constructor() {
		super();
	}

	public encodeText(text:string):string {
		let encodeText:string = "";
		for (let iterator:number = 0; iterator < text.length; iterator ++) {
			let targetLetter:string = text[iterator];
			encodeText += this.encodeLetter(targetLetter);
		}
        return encodeText;
	}

	private encodeLetter(letter:string):string {
		let codeLetter:string;
		letter = letter.toLowerCase();
		let charIndex:number = this.targetSymbols.indexOf(letter);

		if (charIndex != -1) {
			codeLetter = this.codeSymbols[charIndex];
		} else {
			codeLetter = letter;
		}
		return codeLetter;
	}
}
