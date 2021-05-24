import { NextRace } from './../../../model/models';
import { Component, OnInit } from '@angular/core';

import { StandingsService } from '../../../services/standings.service';
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
    circuitId: string;
  
    constructor(private standingsService: StandingsService) {}

  ngOnInit() {
    this.getRoundNo();
    this.getNextRace();
  }


  get todaysDate() {
    let date = new Date();
    return date.toLocaleDateString();
  }

  getRoundNo(): void {
    this.standingsService.getLatestRound().subscribe((data: any) => {
        this.round = data['MRData']['RaceTable']['Races'][0].round;
        this.nextRound = parseInt(this.round) + 1;
        return this.round, this.nextRound;
    })
  }

  getNextRace(): void {
      this.standingsService.getNextRace().subscribe((data:any) => {
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
          this.circuitId = this.nextRace[0].circuitId;
          return this.nextRace, this.raceName, this.circuitId;
      })
  }

}
