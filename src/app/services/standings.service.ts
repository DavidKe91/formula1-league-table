import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map , filter} from 'rxjs/operators';
import { Constructor, Driver, Result } from '../model/models';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(private readonly http: HttpClient) { }

  private constructorsEndpoint = 'current/constructorStandings.json';

  private driversEndpoint = 'current/driverStandings.json';

  private resultsEndpoint = 'current/last/results.json';

    teams: Observable<Constructor[]>;

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

//   getPoints(): Observable<Constructor[]> {
//     return this.http.get<Constructor[]>

//   }
}