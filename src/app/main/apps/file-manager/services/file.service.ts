import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = 'http://25.76.59.152:3000/documentfolder/alex';
  constructor(public http: HttpClient) { }
  public dt;
  public datePipe;
  postTrack(file: File,relativePath:string):any {
    const data =new FormData();
    
    data.append('document', file, file.name);
    data.append('DOCUMENTPATH','14/'+relativePath);
    data.append('CLIENT_COMPANYID','14');
    data.append('USERID', 'alex');
    data.append('NAME', file.name);
    
    this.dt = new Date(file.lastModified);
    this.dt = this.dt.getFullYear() + '-' + ('0' + (this.dt.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dt.getDate()).slice(-2);
    data.append('ACCESS_DATE', this.dt);
    data.append('MODIFICATION_DATE', this.dt);
    data.append('CREATION_DATE', this.dt);
    data.append('STATE', 'ACT');
    data.append('TYPE', 'DOC');
    var Path=relativePath.split('/');
    
    var auxPath=Path[0];
    data.append('PATH_FATHER','14/'+auxPath);
    
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
  agregacar(relativePath:string):any {
    const data =new FormData();
    
   
    data.append('DOCUMENTPATH','14/'+relativePath);
    data.append('CLIENT_COMPANYID','14');
    data.append('USERID', 'alex');
    data.append('NAME', relativePath);
    
    this.dt = new Date();
    this.dt = this.dt.getFullYear() + '-' + ('0' + (this.dt.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dt.getDate()).slice(-2);
    data.append('ACCESS_DATE', this.dt);
    data.append('MODIFICATION_DATE', this.dt);
    data.append('CREATION_DATE', this.dt);
    data.append('STATE', 'ACT');
    data.append('TYPE', 'CAR');
    var Path=relativePath.split('/');
    
    var auxPath=Path[0];
    data.append('PATH_FATHER','14/'+auxPath);
    
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
