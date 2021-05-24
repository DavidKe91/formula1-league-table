import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  export class ConstructorsComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['position', 'name', 'points', 'wins'];
    constructors: Constructor[] = [];
    dataSource = new MatTableDataSource(this.constructors);
  
    @ViewChild('constructorsSort', { static: true }) sort: MatSort;

    constructor(private standingsService: StandingsService) {}

    ngOnInit() {
        this.getConstructors();
    }

    ngAfterViewInit() {   
        this.dataSource.sort = this.sort;
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