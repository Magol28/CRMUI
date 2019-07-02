import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  url = 'http://3.80.207.211:8081/resource/getAll';
  constructor(public http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.url);
  }
  }

