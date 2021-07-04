import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constructor, Driver, NextRace, Result } from '../model/models';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

    constructor(private readonly http: HttpClient) { }

    teams: Observable<Constructor[]>;
    nextRound: Number;

    private constructorsEndpoint = 'current/constructorStandings.json';
    private driversEndpoint = 'current/driverStandings.json';
    private resultsEndpoint = 'current/last/results.json';
    private nextRace;

    httpOptions = {
        headers: new HttpHeaders({ })
    };

  getConstructors(): Observable<Constructor[]> {
    return this.http.get<Constructor[]>
    (
        environment.API_STEM + this.constructorsEndpoint,
        this.httpOptions
    )
  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>
    (
        environment.API_STEM + this.driversEndpoint,
        this.httpOptions
    )
  }

  getLatestRound(): Observable<Result> {
      return this.http.get<Result>(
          environment.API_STEM + this.resultsEndpoint,
          this.httpOptions
      )
  }

  getNextRace(roundNumber): Observable<NextRace> {
      this.nextRace = `2021/${roundNumber}.json`;
      return this.http.get<NextRace>(
          environment.API_STEM + this.nextRace,
          this.httpOptions
      )
  }
  
  getRoundNo(): void {
    this.getLatestRound().subscribe((data: any) => {
        const round = data['MRData']['RaceTable']['Races'][0].round;
        this.nextRound = parseInt(round) + 1;
        return this.nextRound;
    })
  }
}