import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { CountriesService } from 'src/app/services/countries.service';
import { Constructor } from '../../../model/models';
import { StandingsService } from '../../../services/standings.service';

/**
 * @title Table with sorting
 */
 @Component({
    selector: 'f1-constructors',
    styleUrls: ['constructors.component.css'],
    templateUrl: 'constructors.component.html',
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({ height: '0px', minHeight: '0' })),
          state('expanded', style({ height: '*' })),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ],
  })
  export class ConstructorsComponent implements OnInit {
    constructors: Constructor[] = [];
    dataSource = this.constructors;
    loading: boolean;
  
    constructor(private standingsService: StandingsService, private countriesService: CountriesService) {}

    ngOnInit() {
        this.loading = true;
        this.getConstructors();
    }


    getConstructors(): void {
        this.standingsService.getConstructors().subscribe((data: any[]) => {
            this.constructors = data['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings'].map(c => {
                return {
                    position: c.position,
                    name: c['Constructor'].name,
                    points: c.points,
                    wins: c.wins,
                    nationality: c['Constructor'].nationality
                }
            })
            this.getCountryCode(this.constructors);
            this.loading = false;
            return this.constructors;
        })
    }

    getCountryCode(data) {
        data.forEach((element) => {
            const countryCode = this.countriesService.getCountryCode(element.nationality);
            Object.assign(element, {'countryCode': countryCode});
        })
    }
  }