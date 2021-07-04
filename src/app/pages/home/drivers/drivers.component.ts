import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Driver } from '../../../model/models';
import { CountriesService } from './../../../services/countries.service';
import { StandingsService } from '../../../services/standings.service';

@Component({
  selector: 'f1-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
  animations: [
      trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0' })),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
})
export class DriversComponent implements OnInit {
    columns = ['Position', 'Name', 'Points', 'Wins', 'Nationality'];
    drivers: Driver[] = [];
    dataSource = this.drivers;
    loading: boolean;

    constructor(private standingsService: StandingsService, private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.loading = true;
      this.getDrivers();
  }

  getDrivers(): void {
      this.standingsService.getDrivers().subscribe((data: any) => {
          this.drivers = data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'].map(d => {
              return {
                position: d.position,
                points: d.points,
                wins: d.wins,
                name: d['Driver'].givenName + ' ' + d['Driver'].familyName,
                nationality: d['Driver'].nationality
              }
          });
          this.getCountryCode(this.drivers);
          this.setRaceImg(this.drivers);
          this.loading = false;
          return this.drivers;
      })
  }

    getCountryCode(data) {
        data.forEach((element) => {
            const countryCode = this.countriesService.getCountryCode(element.nationality);
            Object.assign(element, {'countryCode': countryCode});
        })
    }

    setRaceImg(data) {
        data.forEach((element) => {
            const raceImg = `https://s3-eu-west-1.amazonaws.com/davidgkennedy.com/f1/assets/${element.circuitId}-md.jpg`.toLowerCase();
            Object.assign(element, {'raceImg': raceImg});
        })
    }

}
