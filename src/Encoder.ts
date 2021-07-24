import Container = PIXI.Container;

export default class Encoder extends Container {
private targetSymbols:string[] = [
		"а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н",
		"о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь",
		"э", "ю", "я", "(", ")", "-", "—"
	];
	private codeSymbols:string[] = [
		"1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "a", "b", "d", "e",
		"f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
		"u", "v", "w", "x", "y", "z", "%",
		//"Ⴧ", "Ⴥ",
	];

	constructor() {
		super();
	}

	public encodeText(text:string):string {
		let encodedText:string = "";
		for (let iterator:number = 0; iterator < text.length; iterator ++) {
			let targetLetter:string = text[iterator];
			encodedText += this.encodeLetter(targetLetter);
		}
        return encodedText;
	}

	public decodeText(text:string):string {
		let decodedText:string = "";
		for (let iterator:number = 0; iterator < text.length; iterator ++) {
			let targetLetter:string = text[iterator];
			decodedText += this.decodeLetter(targetLetter);
		}
        return decodedText;
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

	private decodeLetter(letter:string):string {
		let codeLetter:string;
		letter = letter.toLowerCase();
		let charIndex:number = this.codeSymbols.indexOf(letter);
		console.log(letter);

		if (charIndex != -1) {
			codeLetter = this.targetSymbols[charIndex];
		} else {
			codeLetter = letter;
		}
		return codeLetter;
	}
}
