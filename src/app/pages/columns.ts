export class Meeting {
  meetingName: string;
  dom: Date;
  facilitator: string;
  time: number;
  location: string;
  objective: string;
  attendees: Attendees[] = [];
  agenda: Agenda[] = [];
  documents: Documents[] = [];

  constructor() {
    this.attendees.push(new Attendees());
    this.agenda.push(new Agenda());
    this.documents.push(new Documents());
  }
}

export class Attendees {
  name: string;
  department: string;
  mail: string;
  phone: string;
}

export class Agenda {
  topic: string;
  owner: string;
  time: string;
}

export class Objective {
  value: string;
}

export class Documents {
  description: string;
  preparedBy: string;
}
