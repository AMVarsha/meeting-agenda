import { MeetingAgendaComponent } from './pages/components/meeting-agenda/meeting-agenda.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'meeting-agenda',
    component: MeetingAgendaComponent
  },
  {
    path: '',
    redirectTo: 'meeting-agenda',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
