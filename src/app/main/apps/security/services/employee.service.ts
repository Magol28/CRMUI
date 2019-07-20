import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 // tslint:disable-next-line:typedef
  url = 'http://3.95.152.214:8081/employee';
 constructor(public http: HttpClient) { }
 getAll(): any {
   return this.http.get(this.url + '/getAll');
 }
  getByCedula(cedula: string): any {
    return this.http.get('http://3.95.152.214:8081/employee/' + cedula);
  }
}

