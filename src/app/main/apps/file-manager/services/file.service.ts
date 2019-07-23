import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType  } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = 'http://25.76.59.152:3000/documentfolder/alex';
  constructor(public http: HttpClient) { }
  public dt;
  public datePipe;
  postTrack(file: File,relativePath:string,variable:String):any {
    const data =new FormData();
    var PathFather:string=(''+variable).replace(',','/');
    
    relativePath=PathFather+'/'+relativePath;
    data.append('document', file, file.name);
    data.append('DOCUMENTPATH',relativePath);
    data.append('CLIENT_COMPANYID','14');
    data.append('USERID', 'alex');
    data.append('NAME', file.name);
    
    this.dt = new Date(file.lastModified);
    this.dt = this.dt.getFullYear() + '-' + ('0' + (this.dt.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dt.getDate()).slice(-2);
    data.append('ACCESS_DATE', this.dt);
    data.append('MODIFICATION_DATE', this.dt);
    data.append('CREATION_DATE', this.dt);
    data.append('STATET', 'ACT');
    data.append('TYPE', 'DOC');
    var Path=relativePath.split('/');
    
    
    var auxPath='';
    for (var i = 0; i < (Path.length-1); i++) {
      auxPath += Path[i];
      if (i < (Path.length-2))
      auxPath += '/';
  }
    data.append('PATH_FATHER',auxPath);
    
    return this.http.put(this.url, data, {reportProgress:true,observe:'events'}).subscribe(
      event=>{
        if(event.type===HttpEventType.UploadProgress){
          console.log('Upload Progress: '+Math.round(event.loaded/event.total)*100+'%');
        }else if(event.type===HttpEventType.Response){
          console.log(event);
        }
        
      }
    );
  }

 obtener():any {
    
    return this.http.get('http://25.76.59.152:3000/documentfolder/14/state/ACT', {reportProgress:true,observe:'events'}).subscribe(
      event=>{
        console.log(event);
        
      }
    );
  }

  versiones(version:String):Promise<any> {
    console.log(version);
    
    return new Promise((resolve, reject) => {

      const header = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', dataType: 'jsonp' });
      this.http.get('http://25.76.59.152:3000/documentfolderversion/'+version+'/alex', { headers: header })
          .subscribe((response: any) => {
            console.log('versiones');
              console.log(response.Versions);
              resolve(response);
          }, reject);
  });
    
  }
  eliminar(del:String,statet:string):Promise<any> {
    console.log(del);
    var url='http://25.76.59.152:3000/documentfolder/remove/'+del+'/state/'+statet;
    console.log(url);
    return new Promise((resolve, reject) => {

      const header = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', dataType: 'jsonp' });
      this.http.put(url, { headers: header })
          .subscribe((response: any) => {
            console.log('versiones');
              console.log(response.Versions);
              resolve(response);
          }, reject);
  });
    
  }

  cambiarversion(path:String,id:String):Promise<any> {
    console.log(path);
    
    return new Promise((resolve, reject) => {
      var url='http://25.76.59.152:3000/documentfolder/'+path+'/versionActive/'+id;
      console.log(url);
      const header = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', dataType: 'jsonp' });
      this.http.put(url, { headers: header })
          .subscribe((response: any) => {
            console.log('versiones');
              console.log(response);
              resolve(response);
          }, reject);
  });
    
  }
  
  async descarga(url:string):Promise<Blob> {
    const file = await this.http.get<Blob>(url, { responseType:'blob' as 'json'}).toPromise();
    return file;
  }

  
  agregacar(nombre:string,variable:String[]):any {
    const data =new FormData();
    
    var PathFather:string='';
    for(var i=0;i<variable.length;i++){
      PathFather+=variable[i];
      if(i<(variable.length-1)){
        PathFather+='/';
      }
    }
    var documentpath:string=(variable+'/'+nombre).replace(',','/');
    //data.append('document', undefined, undefined);
    data.append('DOCUMENTPATH',documentpath);
    data.append('CLIENT_COMPANYID','14');
    data.append('USERID', 'alex');
    data.append('NAME', nombre);
    
    this.dt = new Date();
    this.dt = this.dt.getFullYear() + '-' + ('0' + (this.dt.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dt.getDate()).slice(-2);
    data.append('ACCESS_DATE', this.dt);
    data.append('MODIFICATION_DATE', this.dt);
    data.append('CREATION_DATE', this.dt);
    data.append('STATET', 'ACT');
    data.append('TYPE', 'CAR');
    var Path=(PathFather+'/'+nombre).split('/');
    
    console.log(Path);
    var auxPath='';
    for (var i = 0; i < (Path.length-1); i++) {
      auxPath += Path[i];
      if (i < (Path.length-2))
      auxPath += '/';
  }
    data.append('PATH_FATHER',auxPath);
    console.log('Nombre del Archivo')
    console.log(nombre)
    console.log('Path del Archivo')
    console.log(auxPath)
    return this.http.put(this.url, data, {reportProgress:true,observe:'events'}).subscribe(
      event=>{
        if(event.type===HttpEventType.UploadProgress){
          console.log('Upload Progress: '+Math.round(event.loaded/event.total)*100+'%');
        }else if(event.type===HttpEventType.Response){
          console.log(event);
        }
        
      }
    );
  }
}
