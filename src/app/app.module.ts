import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TUI_ICONS_PATH,
  TuiRootModule,
  TuiScrollbarModule,
  TuiSvgModule,
  iconsPathFactory
} from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingAgendaComponent } from './pages/components/meeting-agenda/meeting-agenda.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiAccordionModule,
  TuiInputModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';

@NgModule({
  declarations: [AppComponent, MeetingAgendaComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TuiRootModule,
    TuiTableModule,
    TuiAccordionModule,
    TuiSvgModule,
    TuiInputModule,
    TuiTextAreaModule,
    TuiScrollbarModule
  ],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons')
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
