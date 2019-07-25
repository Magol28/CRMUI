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

  post(nombre, descripcion, estado , recursos): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const user = {
      nombre,
      descripcion,
      estado,
      recursos
    };
    return this.http.post(this.url + '/add', user, { headers });
  }
  put(nombre, descripcion, estado , recursos): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const user = {
      nombre,
      descripcion,
      estado,
      recursos
    };
    return this.http.put(this.url + '/update', user, { headers });
  }
  }
