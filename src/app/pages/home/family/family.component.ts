import { Component, ViewChild, ViewChildren, QueryList, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
export class FamilyComponent implements OnInit, AfterViewInit {

    constructors: Constructor[] = [];
    combinedStandings = [];
    dataSource = new MatTableDataSource(this.combinedStandings);
    personData: FamilyMember[] = [];
    expandedElement: User | null;
    usersData: User[] = [];
    columnsToDisplay = ['position', 'name', 'points'];
    innerDisplayedColumns = ['teams', 'drivers'];

    david: FamilyMember = { name: 'David', points: [], teams: ['Red Bull', 'Ferrari']};
    john: FamilyMember = { name: 'John', points: [], teams: ['McLaren', 'Alpine F1 Team', 'AlphaTauri']};
    pat: FamilyMember = { name: 'Pat', points: [], teams: ['Mercedes', 'Aston Martin']};

    @ViewChild('outerSort', { static: true }) sort: MatSort;
    @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
    @ViewChildren('innerTables') innerTables: QueryList<MatTable<Teams>>;

    // @ViewChild('familySort', { static: true }) sort: MatSort;

    constructor(private standingsService: StandingsService, private cd: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.getFamilyPoints();
        USERS.forEach(user => {
            if (user.teams && Array.isArray(user.teams) && user.teams.length) {
              this.usersData = [...this.usersData, {...user, teams: new MatTableDataSource(user.teams)}];
              console.log(this.usersData);
            } else {
              this.usersData = [...this.usersData, user];
            }
          });
          console.log(this.dataSource);
          this.dataSource.sort = this.sort;
    }

    ngAfterViewInit() {   
        this.dataSource.sort = this.sort;
    }

    toggleRow(element: User) {
        element.teams && (element.teams as MatTableDataSource<Teams>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
        this.cd.detectChanges();
        this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Teams>).sort = this.innerSort.toArray()[index]);
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
        this.familyPointsCalc(this.david);
        this.familyPointsCalc(this.john);
        this.familyPointsCalc(this.pat);
        this.combinedStandings.push(this.david, this.john, this.pat);
        this.combinedStandings.sort((a, b) => parseFloat(b.points) - parseFloat(a.points))
        console.log(this.combinedStandings);
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
    }

}

export interface User {
    position: number;
    name: string;
    points: number;
    teams?: Teams[] | MatTableDataSource<Teams>;
  }
  
  export interface Teams {
    teamName: string;
    drivers: string[];
  }
  
  const USERS: User[] = [
    {
      position: 1,
      name: "David",
      points: 100,
      teams: [
        {
          teamName: "Red Bull",
          drivers: ['Max Verstappen', 'Sergio Perez'],
        },
        {
            teamName: "Ferrari",
            drivers: ['Charles Leclerc', 'Carlos Sainz'],
        },
      ]
    },
    {
        position: 2,
        name: "Pat",
        points: 50,
        teams: [
            {
              teamName: "Mercedes",
              drivers: ['Lewis Hamilton', 'Valtteri'],
            },
            {
                teamName: "Aston Martin",
                drivers: ['Lance Stroll', 'Sebastian Vettel'],
            },
          ]
    },
    {
        position: 3,
        name: "John",
        points: 30,
        teams: [
            {
              teamName: "McLaren",
              drivers: ['Lando Norris', 'Daniel Ricciardo'],
            },
            {
                teamName: "Alpine",
                drivers: ['Esteban Ocon', 'Fernando Alonso'],
            },
          ]
    }
  ];