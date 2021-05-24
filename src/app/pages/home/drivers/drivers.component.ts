import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Driver } from '../../../model/models';
import { StandingsService } from '../../../services/standings.service';

@Component({
  selector: 'f1-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['position', 'points', 'wins', 'name', 'nationality'];
    drivers: Driver[] = [];
    dataSource = new MatTableDataSource(this.drivers);

    @ViewChild(MatSort) sort: MatSort;

    constructor(private standingsService: StandingsService) {}

  ngOnInit(): void {
      this.getDrivers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
          return this.drivers;
      })
  }

}
