import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  industryNames = {
        IT: 'Information Technology',
        LO: 'Logistics',
        OL: 'Oil',
        LS: 'Life-Science'
  };

  constructor() {
  }
}
