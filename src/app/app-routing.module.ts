import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { RaceComponent } from './pages/schedule/race/race.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'schedule/:roundNo', component: RaceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
