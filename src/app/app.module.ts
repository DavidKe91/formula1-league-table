import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConstructorsComponent } from './pages/home/constructors/constructors.component';
import { HttpClientModule } from '@angular/common/http';
import { DriversComponent } from './pages/home/drivers/drivers.component';
import { FamilyComponent } from './pages/home/family/family.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { RaceComponent } from './pages/schedule/race/race.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
