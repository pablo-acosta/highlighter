import { Component,
         Input,
         Output,
         EventEmitter} from '@angular/core';

import { HelpEntry } from '../../models/help-entry';
import { HelpEntries } from '../../data/help';

@Component({
    selector: 'help-page',
    templateUrl: './help-page.component.html',
    styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent {
    @Output() onHelpClose: EventEmitter<any> = new EventEmitter();

    public helpEntries: Array<HelpEntry>;

    constructor() {
        this.helpEntries = HelpEntries;
    }

    close() {
        this.onHelpClose.emit();
    }
}