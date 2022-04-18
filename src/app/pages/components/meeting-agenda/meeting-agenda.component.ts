import { Component } from '@angular/core';
import { COLUMNS } from '../constants';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Agenda, Attendees, Documents, Meeting } from '../../columns';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
export class MeetingAgendaComponent {
  readonly details_columns = COLUMNS.details;
  readonly attendees_columns = COLUMNS.attendees;
  readonly agenda_columns = COLUMNS.agenda;
  readonly preparation_columns = COLUMNS.documents;
  meetingAgenda = new Meeting();

  generatePdf() {
    pdfMake.createPdf(this.getDocumentDefinition()).download();
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
                  text: this.meetingAgenda.meetingName,
                  style: 'tableBody',
                  colSpan: 2
                },
                {}
              ],
              [
                { text: 'Date of Meeting', style: 'tableHeader' },
                { text: this.meetingAgenda.dom, style: 'tableBody' },
                { text: 'Time', style: 'tableHeader' },
                { text: this.meetingAgenda.time, style: 'tableBody' }
              ],
              [
                { text: 'Meeting Facilitator', style: 'tableHeader' },
                { text: this.meetingAgenda.facilitator, style: 'tableBody' },
                { text: 'Location', style: 'tableHeader' },
                { text: this.meetingAgenda.location, style: 'tableBody' }
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
                  text: this.meetingAgenda.objective,
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
              [{ text: 'Name', style: 'sectionHeader'}, { text: 'Department', style: 'sectionHeader'}, { text: 'Mail', style: 'sectionHeader'}, { text: 'Phone', style: 'sectionHeader'}],
              ...this.meetingAgenda.attendees.map((p) => [
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
              [{ text: 'Topic', style: 'sectionHeader'}, { text: 'Owner', style: 'sectionHeader'}, { text: 'Time', style: 'sectionHeader'}],
              ...this.meetingAgenda.agenda.map((p) => [
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
                {
                  text: 'Preparation (documents/handouts to bring, reading material etc.)',
                  style: 'tableHeader',
                  colSpan: 2
                },
                ''
              ],
              [{ text: 'Description', style: 'sectionHeader'}, { text: 'Prepared By', style: 'sectionHeader'}],
              ...this.meetingAgenda.documents.map((p) => [
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
        title: this.meetingAgenda.meetingName + '_MEETING MINUTES',
        author: this.meetingAgenda.meetingName,
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
          fontSize: 14,
          margin: [0, 8]
        },
        name: {
          fontSize: 16,
          bold: true
        },
        tableHeader: {
          margin: [0, 8],
          fontSize: 14,
          color: '#ff7043',
          bold: true
        },
        tableBody: {
          margin: [0, 8],
          fontSize: 12
        }
      }
    };
  }

  addNewRow(data: string): void {
    if (data === 'attendees') {
      this.meetingAgenda.attendees.push(new Attendees());
    } else if (data === 'agenda') {
      this.meetingAgenda.agenda.push(new Agenda());
    } else if (data === 'preparation') {
      this.meetingAgenda.documents.push(new Documents());
    }
  }
}
