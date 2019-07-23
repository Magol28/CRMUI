import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(public http: HttpClient) { }

  getSalesBySeller(id: String) :any{
    const url = 'http://localhost:3000/sales/seller/' + id;
    return this.http.get(url);
  };

  getSalesById(id): any {
    const url = 'http://localhost:3000/sales/' + id;
    return this.http.get(url);
  }
}