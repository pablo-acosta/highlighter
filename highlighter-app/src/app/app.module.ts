import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopPanelComponent  } from './components/top-panel/top-panel.component';
import { TextViewerComponent } from './components/text-viewer/text-viewer.component';
import { HighlightViewerComponent } from './components/highlight-viewer/highlight-viewer.component';
import { BottomPanelComponent  } from './components/bottom-panel/bottom-panel.component';
import { HelpPageComponent  } from './components/help-page/help-page.component';
import { HelpEntryComponent  } from './components/help-entry/help-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    TopPanelComponent,
    TextViewerComponent,
    HighlightViewerComponent,
    BottomPanelComponent,
    HelpPageComponent,
    HelpEntryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
