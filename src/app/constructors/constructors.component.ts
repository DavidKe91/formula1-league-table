import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constructor } from '../model/models';
import { StandingsService } from '../services/standings.service';

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
    davidTeams: string[] = ['Red Bull', 'Ferrari'];
    davidPoints: Constructor[] = [];
    johnTeams: string[] = ['McLaren', 'Alpine F1 Team', 'AlphaTauri'];
    johnPoints: Constructor[] = [];
    patTeams: string[] = ['Mercedes', 'Aston Martin'];
    patPoints: Constructor[] = [];
  
    @ViewChild(MatSort) sort: MatSort;

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
            this.familyPointsCalc(this.davidTeams);
            this.familyPointsCalc(this.johnTeams);
            this.familyPointsCalc(this.patTeams);
            return this.constructors;
        })
    }

    familyPointsCalc(familyMember) {
        let i: number; let j: number; 
        let temp = [];
        let teamScores = [];

        let familyMemberScores = [];
        let finalScore;

        for(i = 0; i < familyMember.length; i++) {
            temp.push(this.constructors.filter(items => items.name === familyMember[i]));
        }
        teamScores = temp;

        for(j = 0; j < teamScores.length; j++) {
            familyMemberScores.push(teamScores[j][0].points);
        }
        finalScore = familyMemberScores.reduce((a,b) => parseInt(a) + parseInt(b), 0);
    }

  }