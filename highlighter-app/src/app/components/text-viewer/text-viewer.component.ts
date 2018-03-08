import { Component,
         Input,
         Output,
         EventEmitter,
         ViewChildren,
         ElementRef,
         QueryList,
         Renderer2,
         HostListener} from '@angular/core';

import { Highlight } from '../../models/highlight';
import { Article } from '../../models/article';

@Component({
    selector: 'text-viewer',
    templateUrl: './text-viewer.component.html',
    styleUrls: ['./text-viewer.component.scss']
})
export class TextViewerComponent {
    @Input() article: Article;
    @Input() bookTitle: string;
    @Input() highlights: Array<Highlight>;
    @Input() selectedHighlight: Highlight;

    @Output() onAddHighlight: EventEmitter<Highlight> = new EventEmitter();
    @Output() onRemoveAll: EventEmitter<any> = new EventEmitter();

    public selected: boolean;
    public newHighlight: Highlight;


    constructor(private elRef: ElementRef, private renderer: Renderer2){
        this.selected = false;
    }

    ngOnChanges(changes: any) {
        if (changes.selectedHighlight) {
            this.displaySelectedHighlight();
        }
    }


    displaySelectedHighlight() {
        let selectedHighlights = this.elRef.nativeElement.querySelectorAll('.highlighter.selected');
        if (selectedHighlights.length) {
            for (let i = 0; i < selectedHighlights.length; i++) {
                this.renderer.removeClass(selectedHighlights[i], 'selected');
            }
        }

        if (this.selectedHighlight !== undefined) {
            selectedHighlights = this.elRef.nativeElement.querySelectorAll('.highlighter-' + String(this.selectedHighlight.id));
            for (let i = 0; i < selectedHighlights.length; i++) {
                this.renderer.addClass(selectedHighlights[i], 'selected');
            }
        }
    }

    addHighlight() {
        let userSelection = window.getSelection();

        if ((window.getSelection) && (window.getSelection().toString().trim().length)) {
            this.newHighlight = new Highlight(this.highlights.length + 1, undefined, undefined, undefined);

            for (let i = 0; i < userSelection.rangeCount; i++) {
                this.highlightRange(userSelection.getRangeAt(i));
            }

            window.getSelection().removeAllRanges();
            this.highlights.push(this.newHighlight);
            // this.highlights.unshift(this.newHighlight);
        }
        // Avoid ContextMenu
        return false;
    }

    highlightRange(range) {
        let highlighterSpan = this.renderer.createElement('highlighter');
        this.renderer.addClass(highlighterSpan, 'highlighter');
        this.renderer.addClass(highlighterSpan, 'highlighter-' + String(this.newHighlight.id));

        highlighterSpan.appendChild(range.extractContents());
        range.insertNode(highlighterSpan);

        this.newHighlight.range = range;
        this.newHighlight.elRef = highlighterSpan;
        this.newHighlight.highlightedText = highlighterSpan.textContent;
    }

    removeAll() {
        this.onRemoveAll.emit();
    }


    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      // Highlight user selection when key 'h' is released
      if (event.keyCode === 72) {
        this.addHighlight();
      }
    }
}
