import Container = PIXI.Container;

export default class Encoder extends Container {
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

		switch(letter) {
			case "а":
			codeLetter = "1"
			break
			case "б":
			codeLetter = "2"
			break
            case "в":
            codeLetter = "3"
            break
			case "г":
            codeLetter = "4"
            break
			case "д":
            codeLetter = "5"
            break
			case "е":
            codeLetter = "6"
            break
			case "ё":
            codeLetter = "7"
            break
			case "ж":
            codeLetter = "8"
            break
			case "з":
            codeLetter = "9"
            break
			case "и":
            codeLetter = "0"
            break

			default:
			codeLetter = letter
		}
		return codeLetter;
	}
}
