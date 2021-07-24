import Container = PIXI.Container;

export default class Encoder extends Container {
	private _targetSymbols:string[] = [
		"а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н",
		"о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь",
		"э", "ю", "я", "(", ")", "-", "—"
	];
	private _codeSymbols:string[] = [
		"1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/", "a", "b", "d", "e",
		"f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
		"u", "v", "w", "x", "y", "z", "%",
	];

	constructor() {
		super();
	}

	public encodeText(text:string):string {
		return this.convertText(text, this._targetSymbols, this._codeSymbols);
	}

	public decodeText(text:string):string {
		return this.convertText(text, this._codeSymbols, this._targetSymbols);
	}

	private convertText(text:string, arrayFrom:string[], arrayTo:string[]):string {
		let convertedText:string = "";
		for (let iterator:number = 0; iterator < text.length; iterator ++) {
			let targetLetter:string = text[iterator];
			convertedText += this.convertLetter(targetLetter, arrayFrom, arrayTo);
		}
        return convertedText;
	}

	private convertLetter(letter:string, arrayFrom:string[], arrayTo:string[]):string {
		let convertedLetter:string;
		letter = letter.toLowerCase();
		let charIndex:number = arrayFrom.indexOf(letter);

		if (charIndex != -1) {
			convertedLetter = arrayTo[charIndex];
		} else {
			convertedLetter = letter;
		}
		return convertedLetter;
	}
}
