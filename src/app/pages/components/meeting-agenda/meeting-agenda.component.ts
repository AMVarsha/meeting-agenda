import { Component, Inject, Injector, OnInit } from '@angular/core';
import { COLUMNS, REGEX_PATTERNS } from '../constants';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

@Component({
  selector: 'app-meeting-agenda',
  templateUrl: './meeting-agenda.component.html',
  styleUrls: ['./meeting-agenda.component.scss']
})
export class MeetingAgendaComponent implements OnInit {
  readonly attendees_columns = COLUMNS.attendees;
  readonly agenda_columns = COLUMNS.agenda;
  readonly preparation_columns = COLUMNS.documents;
  readonly countries = Object.values(TuiCountryIsoCode);
  countryIsoCode = TuiCountryIsoCode.IN;

  meetingForm: FormGroup;
  control: FormArray;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnInit(): void {
    this.meetingForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      dom: [null, Validators.required],
      facilitator: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      objective: ['', Validators.required],
      attendeesRows: this.formBuilder.array([this.attendeesInitiateForm()]),
      agendaRows: this.formBuilder.array([this.agendaInitiateForm()]),
      preparationRows: this.formBuilder.array([this.preparationInitiateForm()])
    });
  }

  attendeesInitiateForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', [Validators.required]],
      mail: [
        '',
        [Validators.required, Validators.pattern(REGEX_PATTERNS.email)]
      ],
      phone: ['', [Validators.required, Validators.minLength(12)]]
    });
  }
  agendaInitiateForm(): FormGroup {
    return this.formBuilder.group({
      topic: ['', Validators.required],
      owner: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
  }
  preparationInitiateForm(): FormGroup {
    return this.formBuilder.group({
      description: ['', Validators.required],
      preparedBy: ['', [Validators.required]]
    });
  }
  get getAttendeesFormControls() {
    return this.meetingForm.get('attendeesRows') as FormArray;
  }
  get getAgendaFormControls() {
    return this.meetingForm.get('agendaRows') as FormArray;
  }
  get getPreparationFormControls() {
    return this.meetingForm.get('preparationRows') as FormArray;
  }

  addNewRow(data: string): void {
    if (data === 'attendees') {
      const control = this.meetingForm.get('attendeesRows') as FormArray;
      control.push(this.attendeesInitiateForm());
    } else if (data === 'agenda') {
      const control = this.meetingForm.get('agendaRows') as FormArray;
      control.push(this.agendaInitiateForm());
    } else if (data === 'preparation') {
      const control = this.meetingForm.get('preparationRows') as FormArray;
      control.push(this.preparationInitiateForm());
    }
  }

  generatePdf(): void {
    pdfMake.createPdf(this.getDocumentDefinition()).open();
  }

  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'Meeting Agenda',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            headerRows: 2,
            widths: ['*', '*', '*', '*'],
            body: [
              [
                {
                  text: 'Meeting / Project Name',
                  style: 'tableHeader',
                  colSpan: 2
                },
                {},
                {
                  text: this.meetingForm.value.projectName,
                  style: 'tableBody',
                  colSpan: 2
                },
                {}
              ],
              [
                { text: 'Date of Meeting', style: 'tableHeader' },
                {
                  text: moment(this.meetingForm.value.dom).format('DD-MM-yyyy'),
                  style: 'tableBody'
                },
                { text: 'Time', style: 'tableHeader' },
                { text: this.meetingForm.value.time, style: 'tableBody' }
              ],
              [
                { text: 'Meeting Facilitator', style: 'tableHeader' },
                {
                  text: this.meetingForm.value.facilitator,
                  style: 'tableBody'
                },
                { text: 'Location', style: 'tableHeader' },
                { text: this.meetingForm.value.location, style: 'tableBody' }
              ]
            ]
          }
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          table: {
            widths: '*',
            body: [
              [
                {
                  text: 'Meeting Objective',
                  style: 'tableHeader'
                }
              ],
              [
                {
                  text: this.meetingForm.value.objective,
                  style: 'tableBody'
                }
              ]
            ]
          }
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 2,
            widths: ['*', '*', '*', '*'],
            body: [
              [
                { text: 'Meeting Attendees', style: 'tableHeader', colSpan: 4 },
                '',
                '',
                ''
              ],
              [
                { text: 'Name', style: 'sectionHeader' },
                { text: 'Department', style: 'sectionHeader' },
                { text: 'Mail', style: 'sectionHeader' },
                { text: 'Phone', style: 'sectionHeader' }
              ],
              ...this.getAttendeesFormControls.value.map((p) => [
                p.name,
                p.department,
                p.mail,
                p.phone
              ])
            ]
          }
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 2,
            widths: ['*', '*', '*'],
            body: [
              [
                { text: 'Meeting Agenda', style: 'tableHeader', colSpan: 3 },
                '',
                ''
              ],
              [
                { text: 'Topic', style: 'sectionHeader' },
                { text: 'Owner', style: 'sectionHeader' },
                { text: 'Time', style: 'sectionHeader' }
              ],
              ...this.getAgendaFormControls.value.map((p) => [
                p.topic,
                p.owner,
                p.time
              ])
            ]
          }
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 2,
            widths: ['*', '*'],
            body: [
              [
                { text: 'Meeting Agenda', style: 'tableHeader', colSpan: 2 },
                ''
              ],
              [
                { text: 'Description', style: 'sectionHeader' },
                { text: 'Prepared By', style: 'sectionHeader' }
              ],
              ...this.getPreparationFormControls.value.map((p) => [
                p.description,
                p.preparedBy
              ])
            ]
          }
        }
      ],
      defaultStyle: {
        alignment: 'justify'
      },
      info: {
        title: this.meetingForm.value.projectName + '_MEETING MINUTES',
        author: this.meetingForm.value.projectName,
        subject: 'MOM',
        keywords: 'MOM'
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10]
        },
        sectionHeader: {
          bold: true,
          fontSize: 12,
          color: '#235185',
          margin: [0, 8]
        },
        tableHeader: {
          margin: [0, 8],
          fontSize: 14,
          color: '#C10466',
          bold: true
        },
        tableBody: {
          margin: [0, 8],
          fontSize: 10
        }
      }
    };
  }
  deleteRow(data: string, index: number): void {
    if (data === 'attendees') {
      Object.values(this.getAttendeesFormControls.value[index]).every(
        (x) => x === null || x === ''
      )
        ? this.confirmDeleteRow(data, index)
        : this.showDialog(data, index);
    } else if (data === 'agenda') {
      Object.values(this.getAgendaFormControls.value[index]).every(
        (x) => x === null || x === ''
      )
        ? this.confirmDeleteRow(data, index)
        : this.showDialog(data, index);
    } else {
      Object.values(this.getPreparationFormControls.value[index]).every(
        (x) => x === null || x === ''
      )
        ? this.confirmDeleteRow(data, index)
        : this.showDialog(data, index);
    }
  }
  private readonly dialog = this.dialogService.open<number>(
    new PolymorpheusComponent(DialogExampleComponent, this.injector),
    { dismissible: true, label: 'Are you sure want to delete?' }
  );
  showDialog(rowData: string, index: number): void {
    this.dialog.subscribe({
      next: (data) => {
        data ? this.confirmDeleteRow(rowData, index) : '';
      }
    });
  }
  confirmDeleteRow(data: string, index: number) {
    data === 'attendees'
      ? this.getAttendeesFormControls.removeAt(index)
      : data === 'agenda'
      ? this.getAgendaFormControls.removeAt(index)
      : this.getPreparationFormControls.removeAt(index);
  }
}
