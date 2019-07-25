import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

   
  // tslint:disable-next-line:typedef
  url = 'http://3.95.152.214:8081/user';
  constructor(public http: HttpClient) { }
  getAll(): any {
    return this.http.get(this.url + '/getAll');
  }
  getByCedula(cedula: string): any {
    return this.http.get(this.url + '/' + cedula);
  }

  post(nombre, password, cedula , id): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const user = {
      nombre,
      password,
      empleado: { cedula },
      perfil: {  nombre: id}
    };
    console.log(this.url + '/add');
    console.log(user);
    return this.http.post(this.url + '/add', user, { headers });
  }
  put(nombre, password, cedula , id): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const user = {
      nombre,
      password,
      empleado: { cedula },
      perfil: { nombre: id}
    };
    console.log(this.url + '/add');
    console.log(user);
    return this.http.put(this.url + '/update', user, { headers });
  }
  
}
