export class Constructor {
    position: number;
    points: number;
    wins: number;
    name: string;
    nationality: string;
}

export interface Driver {
    position: number;
    points: number;
    wins: number;
    name: string;
    nationality: string;
}

export class Result {
    raceName: number;
    round: number;
    nextRound: number;
}

export interface Race {
    round: string;
    raceName: string;
    circuitId: string;
    circuitName: string;
    locality: string;
    country: string;
    countryCode: string;
    raceImg: string;
    date: Date;
    time: string;
}

export interface NextRace {
    raceName: string;
    circuitName: string;
    locality: string;
    country: string;
    date: Date;
    time: string;
}

export interface RaceResult {
    round: string;
    raceName: string;
    circuitName: string;
    circuitId: string;
}

export interface Schedule {
    round: string;
    circuitId: string;
}

export class FamilyMember {
    name: string;
    points: number[];
    position: number;
    teams: string[];
    teamResults: string[];
}
  
export class ConstructorsResponse {
    ConstructorsTable: ConstructorsTable;
}
  
export class ConstructorsTable {
    Constructors: Constructor[];
}