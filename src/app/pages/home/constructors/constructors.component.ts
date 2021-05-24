import { Component, OnInit } from '@angular/core';

import { Constructor } from '../../../model/models';
import { StandingsService } from '../../../services/standings.service';

/**
 * @title Table with sorting
 */
 @Component({
    selector: 'f1-constructors',
    styleUrls: ['constructors.component.css'],
    templateUrl: 'constructors.component.html',
  })
  export class ConstructorsComponent implements OnInit {
    columns = ['Position', 'Name', 'Points', 'Wins'];
    constructors: Constructor[] = [];
    dataSource = this.constructors;
  
    constructor(private standingsService: StandingsService) {}

    ngOnInit() {
        this.getConstructors();
    }


    getConstructors(): void {
        this.standingsService.getConstructors().subscribe((data: any[]) => {
            this.constructors = data['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings'].map(c => {
                return {
                    position: c.position,
                    name: c['Constructor'].name,
                    points: c.points,
                    wins: c.wins
                }
            })
            console.log(this.constructors);
            return this.constructors;
        })
    }
  }