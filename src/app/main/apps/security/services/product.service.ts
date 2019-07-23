import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'app/models/Product';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  url = 'http://3.80.207.211:8081/product/getAll';
  constructor(public http: HttpClient) { }
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}
