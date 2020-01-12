import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CompanyService} from '../service/company.service';
import {IndustryService} from '../service/industry.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})


export class CompanyListComponent implements OnInit {
  displayedColumns = ['name', 'industry', 'country_name', 'id'];

  private companies: any[];

  constructor(private http: HttpClient, private companyService: CompanyService, public industryService: IndustryService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.companyService.getCompanies().subscribe((response: any[]) => {
      this.companies = response;
    });
  }

  deleteCompany(company: any) {
    this.companyService.deleteCompanyS(company).subscribe(() => {
      this.ngOnInit();
    });
  }

}
