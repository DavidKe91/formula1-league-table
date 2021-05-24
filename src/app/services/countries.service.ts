import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor() { }

  getCountryCode(data) {
      data = this.capitaliseFirstLetter(data);
      switch(data) {
        case 'Italy':
            return 'it';
        case 'Portugal':
            return 'pt';
        case 'Spain':
            return 'es';
        case 'Azerbaijan':
            return 'az';
        case 'France':
            return 'fr';
        case 'Austria':
            return 'at';
        case 'UK':
            return 'gb';
        case 'Hungary':
            return 'hu';
        case 'Austria':
            return 'at';
        case 'Monaco':
            return 'mc';
        case 'Bahrain':
            return 'bh';
        case 'Belgium':
            return 'be';
        case 'Netherlands':
            return 'nl';
        case 'Russia':
            return 'ru';
        case 'Singapore':
            return 'sg';
        case 'Japan':
            return 'jp';
        case 'USA':
            return 'us';
        case 'Mexico':
            return 'mx';
        case 'Australia':
            return 'au';
        case 'Brazil':
            return 'br';
        case 'Saudi Arabia':
            return 'sa';
        case 'UAE':
            return 'ae';
        default:
            return '??';
      }
  }

  capitaliseFirstLetter(string) {
    return string && string[0].toUpperCase() + string.slice(1);
  }
}