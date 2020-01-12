import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryService} from '../service/country.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {

  private countryFormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router,
              private countryService: CountryService) {
  }


  ngOnInit() {
    const data = this.route.snapshot.data;

    this.countryFormGroup = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      city: [''],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('api/country/' + id + '/get')
        .subscribe((response) => {
          this.countryFormGroup.patchValue(response);

        });
    }


  }

  createCountry() {
    const country = this.countryFormGroup.value;
    country.id ?
      this.countryService.updateCountry(country).subscribe(() => {
        alert('updated successfully');
      }) :

      this.countryService.createCountry(country).subscribe((response: any) => {
        this.router.navigate(['country-form/' + response.id]);
        alert('created successfully');
      });
  }

}
