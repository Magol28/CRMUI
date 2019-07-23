import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 // tslint:disable-next-line:typedef
  url = 'http://25.64.247.201:5002/api/producto';
  constructor(private http: HttpClient) { }
 getAll(): any {
   return this.http.get(this.url );
 }
  getByCodigo(codigo: string): any {
    return this.http.get(this.url + '/' + codigo);
  }

  post(data): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      
    const objeto = {
      nombre: data.nombre,
      categoria: data.categoria,
      precio: data.precio,
      descripcion: data.descripcion
    };
   
    
    return this.http.post(this.url + '', objeto, {headers});
  }
  
  put(arg): any {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const objeto = {
        cod_producto: arg.cod_producto,
        nombre: arg.nombre,
        categoria: arg.categoria,
        precio: arg.precio,
        descripcion: arg.descripcion
      };
    return this.http.put(this.url + '/'+ arg.cod_producto, objeto, {headers}); }
}

