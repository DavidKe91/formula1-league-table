import { TimeService } from './../../../services/time.service';
import { ActivatedRoute } from '@angular/router';
import { RaceResult } from './../../../model/models';
import { RaceResultsService } from './race-results.service';
import { CountriesService } from './../../../services/countries.service';
import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'f1-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnDestroy {
    columns = ['Position', 'Name', 'Points', 'Nationality', 'Constructor', 'Status'];
    qualifyingColumns = ['Number', 'Position', 'Name', 'Nationality', 'Q1', 'Q2', 'Q3'];
    private sub: any;
    trackImg: string;
    result: RaceResult;
    country: string;
    circuitName: string;
    raceDate: string;
    completed: boolean;
    formattedDate: string;
    driverPoints;
    schedule;
    qualifyingResult;
    roundNumber: number;
    loading: boolean = true;

  constructor(
      private route: ActivatedRoute,
      private raceResultService: RaceResultsService,
      private countriesService: CountriesService,
      private timeService: TimeService
    )
    { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          this.roundNumber = params['roundNo'];
          this.trackImg = `https://s3-eu-west-1.amazonaws.com/davidgkennedy.com/f1/assets/${this.roundNumber}.jpg`;
      });
      this.getSchedule();
  }

  getSchedule() {
    this.raceResultService.getSchedule().subscribe((data: any) => {
        this.schedule = data['MRData']['RaceTable']['Races'].map(s => {
            return {
                round: s.round,
                roundNo: s.round
            }
        })
        this.schedule = this.schedule.filter(rounds => rounds.round === this.roundNumber);
        this.getRaceResult(this.roundNumber);
        this.getQualifyingResult(this.roundNumber);
        this.loading = false;
        return this.roundNumber;
    })
  }

  getRaceResult(roundNumber) {
    this.raceResultService.getRaceResult(roundNumber).subscribe((data: any) => {
        this.result = data['MRData']['RaceTable']['Races'].map(r => {
            return {
                round: r.round,
                raceName: r.raceName,
                circuitId: r['Circuit'].circuitId,
                circuitName: r['Circuit'].circuitName,
                country: r['Circuit']['Location'].country,
                date: r.date,
                time: r.time,
                position: r['Results'][0].position
            }
        }),
        this.driverPoints = data['MRData']['RaceTable']['Races'][0]['Results'].map(o => {
            return {
              position: o.position,
              points: o.points,
              wins: o.wins,
              name: o['Driver'].givenName + ' ' + o['Driver'].familyName,
              nationality: o['Driver'].nationality,
              constructorName: o['Constructor'].name,
              constructorNationality: o['Constructor'].nationality,
              status: o.status
            }
        });
        this.circuitName = this.result[0].circuitName;
        this.getCountryCode(this.driverPoints);

        this.country = this.result[0].country;

        this.raceDate = this.result[0].date;
        let date = new Date();
        let raceD = new Date(this.raceDate);
        this.completed = date > raceD;
        this.formattedDate = this.timeService.formatDate(this.raceDate);

        return this.result, this.driverPoints, this.circuitName, this.country;
        })
    }

    getQualifyingResult(roundNumber) {
        this.raceResultService.getQualifyingResult(roundNumber).subscribe((data: any) => {
            this.qualifyingResult = data['MRData']['RaceTable']['Races'][0]['QualifyingResults'].map(q => {
                return {
                position: q.position,
                number: q.number,
                name: q['Driver'].givenName + ' ' + q['Driver'].familyName,
                nationality: q['Driver'].nationality,
                q1: q.Q1,
                q2: q.Q2,
                q3: q.Q3
                }
            });
            this.getCountryCode(this.qualifyingResult);
            return this.qualifyingResult;
        })
    }

    getCountryCode(data) {
        data.forEach((element) => {
            const countryCode = this.countriesService.getCountryCode(element.nationality);
            Object.assign(element, {'countryCode': countryCode});
        })
    }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
