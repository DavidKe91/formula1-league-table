import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { StandingsService } from './../services/standings.service';
import { Constructor } from '../model/models';

@Component({
  selector: 'f1-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit, AfterViewInit {

    constructors: Constructor[] = [];
    combinedStandings: [] = [];
    dataSource = new MatTableDataSource(this.constructors);
    david = { points: [], teams: ['Red Bull', 'Ferrari']};
    john = { points: [], teams: ['McLaren', 'Alpine F1 Team', 'AlphaTauri']};
    pat = { points: [], teams: ['Mercedes', 'Aston Martin']};

    @ViewChild(MatSort) sort: MatSort;

    constructor(private standingsService: StandingsService) { }

    ngOnInit(): void {
        this.getFamilyPoints();
    }

    ngAfterViewInit() {   
        this.dataSource.sort = this.sort;
    }

  getFamilyPoints() {
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
        this.familyPointsCalc(this.david);
        this.familyPointsCalc(this.john);
        this.familyPointsCalc(this.pat);
        return this.david, this.john, this.pat;
    })
  }

  familyPointsCalc(familyMember) {
    let i: number; let j: number; 
    let temp = [];
    let teamScores = [];

    let familyMemberScores = [];

    for(i = 0; i < familyMember.teams.length; i++) {
        temp.push(this.constructors.filter(items => items.name === familyMember.teams[i]));
    }
    teamScores = temp;

    for(j = 0; j < teamScores.length; j++) {
        familyMemberScores.push(teamScores[j][0].points);
    }
        familyMember.points = familyMemberScores.reduce((a,b) => parseInt(a) + parseInt(b), 0);
    }

}
