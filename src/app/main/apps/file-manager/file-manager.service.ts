import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType  } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Injectable()
export class FileManagerService implements Resolve<any>
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
    )
    {
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
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getFiles()
            ]).then(
                ([files]) => {
                    resolve();
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
    getFiles(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const header = new HttpHeaders({'Content-Type':'application/json; charset=utf-8', dataType:'jsonp'});
            this._httpClient.get('http://25.76.59.152:3000/documentfolder/14/state/ACT', {headers:header})
                .subscribe((response: any) => {
                    this.onFilesChanged.next(response.Items);
                   
                    this.onFileSelected.next(response.Items[0]);
                    resolve(response);
                }, reject);
        });
    }

}
