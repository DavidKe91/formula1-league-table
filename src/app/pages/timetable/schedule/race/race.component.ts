import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'f1-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnDestroy {
    circuitId: string;
    private sub: any;
    trackImg: string;

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          this.circuitId = params['circuitId'];
          this.trackImg = `../../../../../assets/${this.circuitId}.jpg`;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
