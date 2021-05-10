import { Component, OnInit } from '@angular/core';

import { StandingsService } from './services/standings.service';
import { Result } from './model/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'f1';
  round: Result;

  constructor(private standingsService: StandingsService) {}

  ngOnInit() {
      this.roundNo();
  }

  get todaysDate() {
    let date = new Date();
    return date.toLocaleDateString();
  }

  roundNo(): void {
    this.standingsService.getLatestRound().subscribe((data: any) => {
        this.round = data['MRData']['RaceTable']['Races'][0].round;
        console.log(this.round);
        return this.round;
    })
  }
}
