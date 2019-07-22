import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from 'app/models/Resource';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {
    
  // tslint:disable-next-line:typedef
  url = 'https://restcountries.eu/rest/v2/all';
  constructor(public http: HttpClient) { }
  getAll(): any {
    return this.http.get(this.url);
  }
  getByCedula(cedula: string): any {
    return this.http.get('http://3.95.152.214:8081/employee/' + cedula);
  }

  post(data): any {
    return this.http.post(data, 'd');
  }
  put(data): any {
    return this.http.put(data, 'd');
  }
  }

