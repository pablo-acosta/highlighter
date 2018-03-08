import { HelpEntry } from '../models/help-entry';

export let HelpEntries: Array<HelpEntry> = [
    new HelpEntry('Highlighting',
                  '../../../assets/images/highlighter.png',
                  `<ul><li>Select text.</li>
                       <li>Righ click over the selection or press key '<b>h</b>'.</li></ul>`),
    new HelpEntry('Hints',
                  '../../../assets/images/bulb.png',
                `<ul><li>Highlighting of multiple overlapping sections is supported.</li>
                     <li>Put the cursor over a highlighted section, and the given highlight will be marked in the text.</li></ul>`)];
