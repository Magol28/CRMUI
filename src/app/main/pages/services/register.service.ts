import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpParams  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

 // tslint:disable-next-line:typedef
 url = 'http://3.95.152.214:8081/company';
 constructor(public http: HttpClient) { }
  post(data): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(this.url + '/add', data, {headers});
  }
  
}
