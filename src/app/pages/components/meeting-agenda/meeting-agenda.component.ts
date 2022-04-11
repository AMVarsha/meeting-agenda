import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { COLUMNS } from '../constants';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
export function maxLengthValidator(context: {
  requiredLength: string;
}): string {
  return `Maximum length — ${context.requiredLength} is required`;
}

export function minLengthValidator(context: {
  requiredLength: string;
}): string {
  return `Minimum length — ${context.requiredLength} is required`;
}

@Component({
  selector: 'app-meeting-agenda',
  templateUrl: './meeting-agenda.component.html',
  styleUrls: ['./meeting-agenda.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Enter this!',
        email: 'Enter a valid email',
        phone: 'Enter a valid mobile',
        maxlength: maxLengthValidator,
        minlength: minLengthValidator
      }
    }
  ]
})
export class MeetingAgendaComponent implements OnInit {
  readonly details_columns = COLUMNS.details;
  readonly attendees_columns = COLUMNS.attendees;
  readonly agenda_columns = COLUMNS.agenda;
  readonly preparation_columns = COLUMNS.preparation;
  meetingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.meetingForm = this.formBuilder.group({
      objective: ['', [Validators.required, Validators.minLength(5)]],
      attendees_rows: this.formBuilder.array([this.initAttendeesRows()]),
      agenda_rows: this.formBuilder.array([this.initAgendaRows()]),
      preparation_rows: this.formBuilder.array([this.initPreparationRows()])
    });
  }
  get attendeesData(): FormArray {
    return this.meetingForm.get('attendees_rows') as FormArray;
  }
  initAttendeesRows(): AbstractControl {
    return this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }
  initAgendaRows(): AbstractControl {
    return this.formBuilder.group({
      topic: ['', Validators.required],
      owner: ['', Validators.required],
      time: ['', Validators.required]
    });
  }
  initPreparationRows(): AbstractControl {
    return this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      prepared_by: ['', Validators.required]
    });
  }
  get agendaData(): FormArray {
    return this.meetingForm.get('agenda_rows') as FormArray;
  }
  get preparationData(): FormArray {
    return this.meetingForm.get('preparation_rows') as FormArray;
  }

  addNewRow(data: string): void {
    if (data === 'attendees') {
      this.attendeesData.push(this.initAttendeesRows());
    } else if (data === 'agenda') {
      this.agendaData.push(this.initAgendaRows());
    } else if (data === 'preparation') {
      this.preparationData.push(this.initPreparationRows());
    }
  }

  deleteRow(data: string, index: number) {
    if (data === 'attendees') {
      this.attendeesData.removeAt(index);
    } else if (data === 'agenda') {
      this.agendaData.removeAt(index);
    } else if (data === 'preparation') {
      this.preparationData.removeAt(index);
    }
  }
}
