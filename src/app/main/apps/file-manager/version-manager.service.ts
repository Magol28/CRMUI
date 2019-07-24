import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable()
export class VersionManagerService implements Resolve<any>
{
    form: FormGroup;
    onFilesChanged: BehaviorSubject<any>;
    onFileSelected: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        public _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onFilesChanged = new BehaviorSubject({});
        this.onFileSelected = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     *  @param {FileService} _fileService
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getFiles('14')
            ]).then(
                ([files]) => {
                    resolve();
                },
                reject
            );
        });
    }
    /**
     * version
     *
    
     * @returns {Observable<any> | Promise<any> | any}
      *  @param {FileService} _fileService
     */
    version(): Observable<any> | Promise<any> | any {
        return new Promise((versio, reject) => {

            Promise.all([
                this.getFiles('14')
            ]).then(
                ([files]) => {
                    versio();
                },
                reject
            );
        });
    }
    /**
     * Get files
     *
     * @returns {Promise<any>}
     */
    getFiles(aux:String): Promise<any> {
        var info = localStorage.getItem('user');
        var prueba = (JSON.parse(info));
        return new Promise((resolve, reject) => {

            const header = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', dataType: 'jsonp' });
            this._httpClient.get('http://192.168.100.8:3001/documentfolder/'+prueba.empleado.empresa.ruc+'/state/ICT', { headers: header })
                .subscribe((response: any) => {
                    console.log('entro a la version')
                    console.log(response.Versions);
                    this.onFilesChanged.next(response.Items);
                    this.onFileSelected.next(response.Items[0]);
                    resolve(response);
                }, reject);
        });
    }



}
