import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { COLUMNS } from '../constants';
import { tuiCreateTimePeriods, TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TuiDay } from '@taiga-ui/cdk';

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
  items1 = tuiCreateTimePeriods();

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.meetingForm = this.formBuilder.group({
      meeting_name: ['', Validators.required],
      dom: new FormControl(new TuiDay(2017, 2, 15)),
      meeting_facilitator: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
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

  openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('mom.pdf');
    });
  }
}
