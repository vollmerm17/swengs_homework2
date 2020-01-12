import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyListComponent} from './company-list/company-list.component';
import {CompanyFormComponent} from './company-form/company-form.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {CountryOptionsResolver} from './resolver/country-options.resolver';
import {ClientOptionsResolver} from './resolver/client-options.resolver';
import {CompanyResolver} from './resolver/company.resolver';
import {CountryFormComponent} from './country-form/country-form.component';
import {CountryResolver} from './resolver/country.resolver';
import {CountryListComponent} from './country-list/country-list.component';


const routes: Routes = [
  {path: 'company-list', component: CompanyListComponent, canActivate: [AuthGuard]},
  {
    path: 'company-form', component: CompanyFormComponent, canActivate: [AuthGuard], resolve: {
      countryOptions: CountryOptionsResolver, clientOptions: ClientOptionsResolver,
    }
  },
  {
    path: 'company-form/:id', component: CompanyFormComponent, canActivate: [AuthGuard], resolve: {
      countryOptions: CountryOptionsResolver, clientOptions: ClientOptionsResolver, companyResolver: CompanyResolver,
    }
  },
  {path: 'country-list', component: CountryListComponent, canActivate: [AuthGuard]},
  {
    path: 'country-form', component: CountryFormComponent, canActivate: [AuthGuard],
  },
  {
    path: 'country-form/:id', component: CountryFormComponent, canActivate: [AuthGuard], resolve: {
      countryResolver: CountryResolver,
    }
  },
  {path: '', redirectTo: 'company-list', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
