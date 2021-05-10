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
}

export class MRRepsonse {
    MRData: any;
  }
  
export class ConstructorsResponse {
    ConstructorsTable: ConstructorsTable;
}
  
export class ConstructorsTable {
    Constructors: Constructor[];
}