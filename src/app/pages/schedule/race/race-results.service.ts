import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constructor, RaceResult, Schedule } from '../../../model/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaceResultsService {

    constructor(private readonly http: HttpClient) { }

    teams: Observable<Constructor[]>;
    private scheduleEndpoint = '2021.json';
    nextRound: Number;

    httpOptions = {
        headers: new HttpHeaders({ })
    };

  getRaceResult(roundNumber): Observable<RaceResult> {
    return this.http.get<RaceResult>
    (
        environment.API_STEM + `2021/${roundNumber}/results.json`,
        this.httpOptions
    )
  }

  getQualifyingResult(roundNumber): Observable<RaceResult> {
    return this.http.get<RaceResult>
    (
        environment.API_STEM + `2021/${roundNumber}/qualifying.json`,
        this.httpOptions
    )
  }

  getSchedule(): Observable<Schedule> {
    return this.http.get<Schedule>
    (
        environment.API_STEM + this.scheduleEndpoint,
        this.httpOptions
    )
  }
}