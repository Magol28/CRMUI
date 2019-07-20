import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    
  // tslint:disable-next-line:typedef
  url = 'https://restcountries.eu/rest/v2/all';
  constructor(public http: HttpClient) { }
  getAll(): any {
    return this.http.get(this.url);
  }
  }
