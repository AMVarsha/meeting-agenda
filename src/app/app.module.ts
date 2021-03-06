import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TUI_ICONS_PATH,
  TuiRootModule,
  TuiScrollbarModule,
  TuiSvgModule,
  iconsPathFactory,
  TuiButtonModule,
  TuiLabelModule,
  TuiDialogModule
} from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingAgendaComponent } from './pages/components/meeting-agenda/meeting-agenda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPhoneInternationalModule,
  TuiInputTimeModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiOverscrollModule } from '@taiga-ui/cdk';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { DialogExampleComponent } from './pages/components/dialog-example/dialog-example.component';

@NgModule({
  declarations: [AppComponent, MeetingAgendaComponent, DialogExampleComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiRootModule,
    TuiTableModule,
    TuiSvgModule,
    TuiInputModule,
    TuiTextAreaModule,
    TuiScrollbarModule,
    FormsModule,
    TuiButtonModule,
    TuiOverscrollModule,
    TuiLabelModule,
    TuiInputDateModule,
    TuiInputTimeModule,
    TuiDialogModule,
    TuiInputPhoneInternationalModule,
    ReactiveFormsModule,
    PolymorpheusModule
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
