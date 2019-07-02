import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    
  constructor(public http: HttpClient) { }
  // tslint:disable-next-line:typedef
  getAll() {

      const test = [
          {
              id: '1',
              name: '2',
              name1: '2',
              name2: '2',
              name3: '2',

          },
          {
            id: '2',
            name: '2',
            name1: '2',
            name2: '2',
            name3: '2',

        }
      ];
      return  test;
  }
  }
