import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConstructorsComponent } from './pages/home/constructors/constructors.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { DriversComponent } from './pages/home/drivers/drivers.component';
import { FamilyComponent } from './pages/home/family/family.component';
import { ScheduleComponent } from './pages/timetable/schedule/schedule.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { RaceComponent } from './pages/timetable/schedule/race/race.component';

@NgModule({
  declarations: [
    AppComponent,
    ConstructorsComponent,
    DriversComponent,
    FamilyComponent,
    ScheduleComponent,
    HomePageComponent,
    RaceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
