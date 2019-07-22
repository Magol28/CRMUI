import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 // tslint:disable-next-line:typedef
  url = 'http://3.95.152.214:8081/employee';
  constructor(private http: HttpClient) { }
 getAll(): any {
   return this.http.get(this.url + '/getAll');
 }
  getByCedula(cedula: string): any {
    return this.http.get(this.url + '/' + cedula);
  }

  post(data): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const objeto = {
      cedula: data.cedula,
      nombre: data.nombre,
      fechaNacimiento: data.fechaNacimiento,
      direccion: data.direccion,
      telefono: data.telefono,
      email: data.email,
      sexo: data.sexo,
      empresa: {nombre: 'SuSo Labs', 
      ruc: '1102096321001', 
      razonSocial: 'Ventas', 
      direccion: 'Sangolqui', 
      telefono: '0996108755', 
      email: 'susolabs@gmail.com'}
    };
    this.url += '/add';
    return this.http.post(this.url, objeto, {headers});
  }
  
  put(data): any {
    const objeto = {
      cedula: data.cedula,
      nombre: data.nombre,
      fechaNacimiento: data.fechaNacimiento,
      direccion: data.direccion,
      telefono: data.telefono,
      email: data.email,
      sexo: data.sexo,
      empresa: {nombre: 'SuSo Labs', 
      ruc: '1102096321001', 
      razonSocial: 'Ventas', 
      direccion: 'Sangolqui', 
      telefono: '0996108755', 
      email: 'susolabs@gmail.com'}
    };
    return this.http.put( 'http://3.95.152.214:8081/employee/add', JSON.stringify(objeto), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}

