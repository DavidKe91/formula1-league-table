import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Race } from '../../../model/models';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  private scheduleEndpoint = 'current.json';
  races: Observable<Race[]>;

  getSchedule(): Observable<Race[]> {
      return this.http.get<Race[]>(
        environment.API_STEM + this.scheduleEndpoint
      )
  }
}
