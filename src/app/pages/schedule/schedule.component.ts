import { Component, OnInit } from '@angular/core';

import { CountriesService } from './../../services/countries.service';
import { ScheduleService } from './schedule.service';
import { Race } from '../../model/models';

@Component({
  selector: 'f1-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

    races: Race[] = [];
    constructor(private scheduleService: ScheduleService, private countriesService: CountriesService) { }
    raceImg: string;
    todaysDate = new Date();
    formattedDate;
    pastEvent: Boolean;

    ngOnInit(){
        this.formattedDate = this.todaysDate.getFullYear() + '-' + ('0' + (this.todaysDate.getMonth()+1)).slice(-2) + '-'
        + ('0' + this.todaysDate.getDate()).slice(-2);
        this.getSchedule();
    }

    getSchedule() {
        this.scheduleService.getSchedule().subscribe((data: any) => {
            this.races = data['MRData']['RaceTable']['Races'].map(d => {
                return {
                    round: d.round,
                    raceName: d.raceName,
                    circuitId: d['Circuit'].circuitId,
                    circuitName: d['Circuit'].circuitName,
                    locality: d['Circuit']['Location'].locality,
                    country: d['Circuit']['Location'].country,
                    date: d.date,
                    time: d.time
                }
            });
            this.getCountryCode(this.races);
            this.setRaceImg(this.races);
            this.compareDates(this.races, this.formattedDate);
            return this.races;
        })
    }

    getCountryCode(data) {
        data.forEach((element) => {
            const countryCode = this.countriesService.getCountryCode(element.country);
            Object.assign(element, {'countryCode': countryCode});
        })
    }

    setRaceImg(data) {
        data.forEach((element) => {
            const raceImg = `https://s3-eu-west-1.amazonaws.com/davidgkennedy.com/f1/assets/${element.round}-md.jpg`.toLowerCase();
            Object.assign(element, {'raceImg': raceImg});
        })
    }

    compareDates(data, todaysdate) {
        data.forEach((element) => {
            this.pastEvent = (todaysdate > element.date) ? true : false;
            Object.assign(element, {'pastEvent': this.pastEvent});
        })
    }

    onImgError(event) {
        event.target.src="https://s3-eu-west-1.amazonaws.com/davidgkennedy.com/f1/assets/error.jpg";
    }
}
