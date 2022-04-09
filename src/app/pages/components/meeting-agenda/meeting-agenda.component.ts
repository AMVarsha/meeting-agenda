import { Component } from '@angular/core';
import {
  AGENDA_COLUMNS,
  ATTENDEES_COLUMNS,
  PREPARATION_COLUMNS
} from '../constants';

@Component({
  selector: 'app-meeting-agenda',
  templateUrl: './meeting-agenda.component.html',
  styleUrls: ['./meeting-agenda.component.scss']
})
export class MeetingAgendaComponent {
  readonly attendees_columns = ATTENDEES_COLUMNS;
  readonly agenda_columns = AGENDA_COLUMNS;
  readonly preparation_columns = PREPARATION_COLUMNS;
}
