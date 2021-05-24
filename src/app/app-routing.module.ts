import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { ScheduleComponent } from './pages/timetable/schedule/schedule.component';
import { RaceComponent } from './pages/timetable/schedule/race/race.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'schedule/:circuitId', component: RaceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
