import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  /* _url = "http://localhost:3000/"; */
  _url = "http://3.91.68.253:3000/";


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
    const url = this._url+'sales/seller/'+'1726781584';
    return this.http.post(url, data, {headers});
  }
    

  getSalesById(id): any {
    const url = 'http://192.168.100.8:3000/sales/' + id;
    return this.http.get(url);
  }

  getTaskBySale(id: String) :any{
    const url = this._url+'sales/'+id+'/tasks';
    return this.http.get(url);
  }    
  getMeetingsBySale(id: String) :any{
    const url = this._url+'sales/'+id+'/meetings';
    return this.http.get(url);
  }
  getCommunicationsBySale(id: String) :any{
    const url = this._url+'sales/'+id+'/communications';
    return this.http.get(url);
  }
  getCallsBySale(id: String) :any{
    const url = this._url+'sales/'+id+'/communications/call';
    return this.http.get(url);
  }
  getMailsBySale(id: String) :any{
    const url = this._url+'sales/'+id+'/communications/mail';
    return this.http.get(url);
  }
  getQuotationsBySale(id: String) :any{
    const url = this._url+'sales/'+id+'/quotations';
    return this.http.get(url);
  }
  getServices(id: String) :any{
    const url = this._url+'services';
    return this.http.get(url);
  }

  changePhase(id: String, data) :any{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      console.log(data);
      const url = this._url+'sales/'+id+'/phase';
    return this.http.post(url, data, {headers});
  }

  postTask(id: String, data): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      console.log(data);
    const url = this._url+'sales/'+id+'/tasks';
    return this.http.post(url, data, {headers});
  }

  postMeeting(id: String, data): any {
    console.log(data);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      console.log(data);
    const url = this._url+'sales/'+id+'/meetings';
    return this.http.post(url, data, {headers});
  }

  postCall(id: String, data): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      console.log(data);
    const url = this._url+'sales/'+id+'/communications';
    return this.http.post(url, data, {headers});
  }

  postMail(id: String, data): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      console.log(data);
    const url = this._url+'sales/'+id+'/communications/mail';
    return this.http.post(url, data, {headers});
  }

  postService(data): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      console.log(data);
    const url = this._url+'services';
    return this.http.post(url, data, {headers});
  }

  postCotizacion(id:String, data): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      console.log(data);
    const url = this._url+'sales/'+id+'/quotations'
    return this.http.post(url, data, {headers});
  }

  putSale(id: String): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const url = this._url+'sales/'+id+'/acceptedQuotation';
    return this.http.put(url, {headers});
  }

  putSaleClose(id: String): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const url = this._url+'sales/'+id;
    return this.http.put(url, {headers});
  }

  putSaleCancel(id: String): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const url = this._url+'sales/'+id+'/canceled';
    return this.http.put(url, {headers});
  }

}