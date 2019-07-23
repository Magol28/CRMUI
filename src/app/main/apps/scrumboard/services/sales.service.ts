import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  /* _url = "http://localhost:3000/"; */
  _url = "http://192.168.100.8:3000/";


  constructor(public http: HttpClient) { }

  getSalesBySeller(id: String) :any{
    const url = this._url+'sales/seller/'+id;
    //console.log(url);
    return this.http.get(url);
  };
  
  postSale(data): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      console.log(data);
    const url = this._url+'sales/seller/'+'1723954093';
    return this.http.post(url, data, {headers});
  }
    

  getSalesById(id): any {
    const url = 'http://192.168.100.8:3000/sales/' + id;
    return this.http.get(url);
  }
}