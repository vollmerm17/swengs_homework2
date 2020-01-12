import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  getCompanies() {
    return this.http.get('/api/company/list');
  }

  createCompany(company: any) {
    return this.http.post('/api/company/create', company);
  }

  updateCompany(company: any) {
    return this.http.put('/api/company/' + company.id + '/update', company);
  }

  deleteCompanyS(company: any) {
    return this.http.delete('/api/company/' + company.id + '/delete');
  }

  calculateAge(date) {
    const ageDiff = Date.now() - date;
    if (ageDiff > 0) {
      const ageDate = new Date(ageDiff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      return 0;
    }
  }

  getCompany(id: string) {
    return this.http.get('/api/company/' + id + '/get');
  }

}
