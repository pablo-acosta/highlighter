import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Highlight } from './models/highlight';
import { Article } from './models/article';

import { articleSample1 } from './data/article-samples';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public appTitle = 'HighlitherApp';
    public author = 'Pablo Acosta';

    public highlights: Array<Highlight>;
    public article: Article;
    public selectedHighlight: Highlight;
    public highlightedText: Highlight;

    public model: any;
    public showHelpPage: boolean;
    public showDownloadForm: boolean;

    constructor(private elRef: ElementRef, private renderer: Renderer2){
        this.article = articleSample1;
        this.highlights = [];
        this.selectedHighlight = undefined;
        this.showHelpPage = false;
        this.showDownloadForm = false;
        this.model = {'code': undefined};

        if (!localStorage.getItem('cookie')) {
            localStorage.setItem('cookie', this.cnonce(16));
        }
    }

    onSelectedHighlight(highlight: Highlight) {
        this.selectedHighlight = highlight;
    }

    onRemoveHighlight(hl: Highlight){
        this.unwrap('.highlighter-' + String(this.selectedHighlight.id));
        this.highlights.forEach((highlight, index) => {
          if (highlight.id === this.selectedHighlight.id) {
            this.highlights.splice(index, 1);
          }
        });
    }

    removeAll() {
      this.unwrap('.highlighter');
      this.highlights = [];
    }

    unwrap(selector: string){
        let elrefs = this.elRef.nativeElement.querySelectorAll(selector);
        for (let i = 0; i < elrefs.length; i++){
            let parent = elrefs[i].parentNode;
            while (elrefs[i].firstChild) {
                parent.insertBefore(elrefs[i].firstChild, elrefs[i]);
            }
            parent.removeChild(elrefs[i]);
        }
    }

    toogleHelpPageView(){
        this.showHelpPage = !this.showHelpPage;
    }

    cnonce(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    toogleDownloadPanelView() {
        this.showDownloadForm = !this.showDownloadForm ;
        this.model.code = undefined;
    }

    onSubmit() {
        console.log('Download file');
        interface MyWindow extends Window {
            myFunction(): void;
        }

        const url = '/api/' + localStorage.getItem('cookie') + '/file/download/' + this.model.code;
        this.model.code = undefined;
        this.showDownloadForm = false;
        window.open(url);
    }
}
