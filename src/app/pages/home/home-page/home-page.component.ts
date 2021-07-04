import { NextRace } from './../../../model/models';
import { Component, OnInit } from '@angular/core';

import { StandingsService } from '../../../services/standings.service';
import { TimeService } from './../../../services/time.service';
import { Result } from '../../../model/models';

@Component({
  selector: 'f1-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    title = 'f1';
    round: string;
    nextRound: number;
    nextRace: NextRace;
    raceName: string;
    circuitName: string;
    raceDate;
    formattedDate: string;
    raceTime: string;
    circuitId: string;
  
    constructor(private standingsService: StandingsService, private timeService: TimeService) {}

    ngOnInit() {
        this.getRoundNo();
  }


  get todaysDate() {
    let date = new Date();
    return date.toLocaleDateString();
  }

  getRoundNo(): void {
    this.standingsService.getLatestRound().subscribe((data: any) => {
        this.round = data['MRData']['RaceTable']['Races'][0].round;
        this.nextRound = parseInt(this.round) + 1;
        this.getNextRace(this.nextRound);
        return this.round, this.nextRound;
    })
  }

  getNextRace(round): void {
      this.standingsService.getNextRace(round).subscribe((data:any) => {
          this.nextRace = data['MRData']['RaceTable']['Races'].map(r => {
              return {
                  raceName: r['raceName'],
                  circuitName: r['Circuit']['circuitName'],
                  locality: r['Circuit']['Location']['locality'],
                  country: r['Circuit']['Location']['country'],
                  date: r['date'],
                  time: r['time'],
                  circuitId: r['Circuit']['circuitId']
              }
          });

          this.raceName = this.nextRace[0].raceName;
          this.raceDate = this.nextRace[0].date;
          this.circuitName = this.nextRace[0].circuitName;
          this.formattedDate = this.timeService.formatDate(this.raceDate);
          this.circuitId = this.nextRace[0].circuitId;
          return this.nextRace, this.raceName, this.circuitId, this.formattedDate, this.circuitName;
      })
  }
}
