export class Constructor {
    position: number;
    points: number;
    wins: number;
    name: string;
    nationality: string;
}

export class Driver {
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

export class FamilyMember {
    name: string;
    points: number[];
    teams: string[];
}
  
export class ConstructorsResponse {
    ConstructorsTable: ConstructorsTable;
}
  
export class ConstructorsTable {
    Constructors: Constructor[];
}