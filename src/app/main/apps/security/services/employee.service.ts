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
      
    const info = localStorage.getItem('user');
    const prueba = (JSON.parse(info));
    const objeto = {
      cedula: data.cedula,
      nombre: data.nombre,
      fechaNacimiento: data.fechaNacimiento,
      direccion: data.direccion,
      telefono: data.telefono,
      email: data.email,
      sexo: data.sexo,
      empresa: prueba.empleado.empresa
    };
   
    
    return this.http.post(this.url + '/add', objeto, {headers});
  }
  
  put(data): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const info = localStorage.getItem('user');
    const prueba = (JSON.parse(info));
    const objeto = {
        cedula: data.cedula,
        nombre: data.nombre,
        fechaNacimiento: data.fechaNacimiento,
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email,
        sexo: data.sexo,
        empresa: prueba.empleado.empresa
      };
    return this.http.put(this.url + '/update', objeto, {headers}); }
}

