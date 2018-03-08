import { Component,
         Input,
         EventEmitter,
         ViewChildren } from '@angular/core';

import { HelpEntry } from '../../models/help-entry'; 

@Component({
    selector: 'help-entry',
    templateUrl: './help-entry.component.html',
    styleUrls: ['./help-entry.component.scss']
})
export class HelpEntryComponent {
    @Input() helpEntry: HelpEntry;

    constructor() {}

    ngOnChanges(changes: any) {}
}