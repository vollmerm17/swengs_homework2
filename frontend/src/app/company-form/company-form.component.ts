import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {IndustryService} from '../service/industry.service';
import {CompanyService} from '../service/company.service';
import {callbackify} from 'util';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  companyFormGroup;
  private countryOptions;
  private customerOptions;
  private age: number;
  private captcha: any;


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router,
              private companyService: CompanyService, public industryService: IndustryService) {
  }


  ngOnInit() {
    const data = this.route.snapshot.data;
    this.countryOptions = data.countryOptions;
    this.customerOptions = data.clientOptions;

    this.companyFormGroup = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      industry: [null, Validators.required],
      country: [null, Validators.required],
      founding_date: [null, Validators.required],
      telephone_number: [null, Validators.compose([Validators.required, this.telephoneValidator()])],
      customers: [[]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('api/company/' + id + '/get')
        .subscribe((response) => {
          this.companyFormGroup.patchValue(response);

        });
    }

    this.companyFormGroup.controls.founding_date.valueChanges.subscribe(() => {
      const founding = this.companyFormGroup.controls.founding_date.value;
      this.age = undefined;
      if (founding) {
        this.age = this.companyService.calculateAge(new Date(founding));
      }
    });
  }

  createCompany() {
    const company = this.companyFormGroup.value;
    company.id ?
      this.companyService.updateCompany(company).subscribe(() => {
        alert('updated successfully');
      }) :
      this.companyService.createCompany(company).subscribe((response: any) => {
        this.router.navigate(['company-form/' + response.id]);
        alert('created sucessfully');
      });
  }

  telephoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^\++?[1-9][0-9]\d{6,14}$/.test(control.value);
      if (isValid) {
        return null;
      } else {
        return {invalid: true};
      }
    };
  }

  /*
    telephoneDoubleValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return this.companyService.getCompanies()
          .pipe(
            map((companies: any[]) => {
              const currentId = this.companyFormGroup.controls.id.value;
              const currentTelephone = this.companyFormGroup.controls.telephone_number.value;
              const companyWithSameTelephone = companies.find((c) => {
                return c.id !== currentId && c.telephone_number === currentTelephone;
              });
              if (companyWithSameTelephone) {
                return {
                  telephoneAlreadyExists: true
                };
              } else {
                return null;
              }
            })
          );
      };
    }*/
  recaptchaCallback() {
    if (this.captcha.getResponse().length >= 0 ) {
      alert('Please click the reCAPTCHA checkbox');
      return false;
    }
    return true;
  }
}
