import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Highlight } from '../../models/highlight'

@Component({
    selector: 'highlight-viewer',
    templateUrl: './highlight-viewer.component.html',
    styleUrls: ['./highlight-viewer.component.scss']
})
export class HighlightViewerComponent {
    @Input() highlights: Array<Highlight>;
    @Output() onSelectedHighlight: EventEmitter<Highlight> = new EventEmitter();
    @Output() onRemoveHighlight: EventEmitter<Highlight> = new EventEmitter();

    constructor() {}

    selectHighlight(hl: Highlight) {
        this.onSelectedHighlight.emit(hl);
    }

    removeHighlight(hl: Highlight) {
        this.onRemoveHighlight.emit(hl);
    }
}