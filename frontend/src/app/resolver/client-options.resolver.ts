import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CustomerService} from '../service/customer.service';


@Injectable({
  providedIn: 'root'
})
export class ClientOptionsResolver implements Resolve<Observable<any>> {
  constructor(private clientService: CustomerService) {
  }

  resolve() {
    return this.clientService.getCustomerOptions();
  }
}
