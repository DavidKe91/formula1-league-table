import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constructor, Driver } from '../model/models';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(private readonly http: HttpClient) { }

  private constructorsEndpoint = 'current/constructorStandings.json';

  private driversEndpoint = 'current/driverStandings.json';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

  
}
