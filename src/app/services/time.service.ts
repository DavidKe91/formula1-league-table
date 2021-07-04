import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

    formattedDate: string;
    yearMonthDate: string;

    constructor() { }

    formatDate(date) {
        let d = new Date(date);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        this.formattedDate = `${mo} ${da}, ${ye}`;
        return this.formattedDate;
    }

    getYearMonthDate(date) {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        this.yearMonthDate = year + "/" + month + "/" + day;
    }
}
