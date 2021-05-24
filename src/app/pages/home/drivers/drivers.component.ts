import { CountriesService } from './../../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { Driver } from '../../../model/models';
import { StandingsService } from '../../../services/standings.service';

@Component({
  selector: 'f1-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
    columns = ['Position', 'Points', 'Wins', 'Name', 'Nationality'];
    drivers: Driver[] = [];
    dataSource = this.drivers;

    constructor(private standingsService: StandingsService, private countriesService: CountriesService) {}

  ngOnInit(): void {
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
            const raceImg = `../../../../../assets/${element.circuitId}-md.jpg`.toLowerCase();
            Object.assign(element, {'raceImg': raceImg});
        })
    }

}
