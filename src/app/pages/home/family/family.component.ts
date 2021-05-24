import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { StandingsService } from '../../../services/standings.service';
import { Constructor } from '../../../model/models';
import { FamilyMember } from '../../../model/models';

@Component({
  selector: 'f1-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FamilyComponent implements OnInit {

    constructors: Constructor[] = [];
    combinedStandings = [];
    dataSource = this.combinedStandings;
    personData: FamilyMember[] = [];
    expandedElement: User | null;
    usersData: User[] = [];
    columns = ['Position', 'Name', 'Points'];
    innerDisplayedColumns = ['teams', 'drivers'];

    familyData: FamilyMember[] = [
        { name: 'David', points: [], position: 0, teams: ['Red Bull', 'Ferrari']},
        { name: 'John', points: [], position: 0, teams: ['McLaren', 'Alpine F1 Team', 'AlphaTauri'] },
        { name: 'Pat', points: [], position: 0, teams: ['Mercedes', 'Aston Martin'] }
    ]

    constructor(private standingsService: StandingsService) { }

    ngOnInit(): void {
        this.getFamilyPoints();
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
        this.familyData.forEach(member => this.familyPointsCalc(member));
        this.combinedStandings.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
        this.familyData.forEach(member => this.calculatePosition(member));
    })
    return this.combinedStandings, this.constructors;
  }

  familyPointsCalc(familyMember): void {
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

        this.combinedStandings.push(familyMember);
    }

    calculatePosition(familyMember) {
        const position = this.combinedStandings.findIndex(i => i.name === familyMember.name);
        return familyMember.position = position + 1;
    }
}

export interface User {
    position: number;
    name: string;
    points: number;
    teams?: Teams[];
}
  
export interface Teams {
    teamName: string;
    drivers: string[];
}