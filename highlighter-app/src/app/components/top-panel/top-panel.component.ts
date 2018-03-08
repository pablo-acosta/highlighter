import { Component,
         Input,
         Output,
        EventEmitter} from '@angular/core';

@Component({
    selector: 'top-panel',
    templateUrl: './top-panel.component.html',
    styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent {
    @Input() appTitle: string;
    @Output() onHelpButtonClick: EventEmitter<any> = new EventEmitter();
    @Output() onDownloadButtonClick: EventEmitter<any> = new EventEmitter();

    public model: any;
    public showDownloadForm: boolean;

    constructor() {
        this.model = {'code': undefined};
        this.showDownloadForm = false;
    }

    helpButtonClick() {
        this.onHelpButtonClick.emit();
    }

    downloadButtonClick() {
        this.onDownloadButtonClick.emit();
    }

    toggleDownloadPanelView() {
        this.showDownloadForm = !this.showDownloadForm ;
    }
}
