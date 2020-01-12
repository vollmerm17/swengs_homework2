import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) {
  }

  retrieveCountryOptions() {
    return this.http.get<any[]>('/api/country/options');
  }

  getCountries() {
    return this.http.get('/api/country/list');
  }

  createCountry(country: any) {
    return this.http.post('/api/country/create', country);
  }

  updateCountry(country: any) {
    return this.http.put('/api/country/' + country.id + '/update', country);
  }

  deleteCountryS(country: any) {
    return this.http.delete('/api/country/' + country.id + '/delete');
  }

  getCountry(id: string) {
    return this.http.get('/api/country/' + id + '/get');
  }
}
