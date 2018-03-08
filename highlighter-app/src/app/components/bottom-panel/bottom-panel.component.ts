import { Component,
         Input,
         Output} from '@angular/core';

@Component({
    selector: 'bottom-panel',
    templateUrl: './bottom-panel.component.html',
    styleUrls: ['./bottom-panel.component.scss']
})
export class BottomPanelComponent {
    @Input() author: string;

    constructor() {}

    ngOnChanges(changes: any) {}
}