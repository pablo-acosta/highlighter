export class Highlight {
    id: number;
    highlightedText: string;
    range: any;
    elRef: any;

    constructor(id: number, highlightedText: string, range: any, elRef: any) {
        this.id = id;
        this.highlightedText = highlightedText;
        this.range = range;
        this.elRef = elRef;
    }
}
