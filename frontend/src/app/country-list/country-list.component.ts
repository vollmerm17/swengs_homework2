import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {CountryService} from '../service/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})


export class CountryListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'city'];

  private countries: any[];

  constructor(private http: HttpClient, private countryService: CountryService, public userService: UserService) {
  }

  ngOnInit() {
    this.countryService.getCountries().subscribe((response: any[]) => {
      this.countries = response;
    });
  }

  deleteCountry(country: any) {
    this.countryService.deleteCountryS(country).subscribe(() => {
      this.ngOnInit();
    });
  }

}
