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
        case 'Italian':
            return 'it';
        case 'Portugal':
            return 'pt';
        case 'Germany':
        case 'German':
            return 'de';
        case 'Spain':
        case 'Spanish':
            return 'es';
        case 'Azerbaijan':
            return 'az';
        case 'France':
        case 'French':
            return 'fr';
        case 'Australia':
        case 'Australian':
            return 'au';
        case 'UK':
        case 'British':
            return 'gb';
        case 'Hungary':
            return 'hu';
        case 'Austria':
        case 'Austrian':
            return 'at';
        case 'Monaco':
        case 'Monegasque':
            return 'mc';
        case 'Bahrain':
            return 'bh';
        case 'Belgium':
            return 'be';
        case 'Netherlands':
        case 'Dutch':
            return 'nl';
        case 'Russia':
        case 'Russian':
            return 'ru';
        case 'Singapore':
            return 'sg';
        case 'Japan':
        case 'Japanese':
            return 'jp';
        case 'USA':
            return 'us';
        case 'Mexico':
        case 'Mexican':
            return 'mx';
        case 'Australia':
            return 'au';
        case 'Canada':
        case 'Canadian':
            return 'ca';
        case 'Brazil':
            return 'br';
        case 'Saudi Arabia':
            return 'sa';
        case 'UAE':
            return 'ae';
        case 'Finland':
        case 'Finnish':
            return 'fi';
        case 'Switzerland':
        case 'Swiss':
            return 'ch';
        case 'America':
        case 'American':
            return 'us';
        default:
            return '??';
      }
  }

  capitaliseFirstLetter(string) {
    return string && string[0].toUpperCase() + string.slice(1);
  }
}