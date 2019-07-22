import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    
  // tslint:disable-next-line:typedef
  url = 'http://3.95.152.214:8081/profile';
  constructor(public http: HttpClient) { }
  getAll(): any {
    return this.http.get(this.url + '/getAll');
  }
  getByCedula(id: string): any {
    return this.http.get(this.url + '/' + id);
  }

  post(data): any {
    return this.http.post(data, 'd');
  }
  put(data): any {
    return this.http.put(data, 'd');
  }
  }
