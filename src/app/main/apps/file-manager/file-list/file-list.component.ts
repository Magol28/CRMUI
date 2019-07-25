import { Component, ViewChild, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'; import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import {ChangeDetectionStrategy} from '@angular/core';
import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';
import { VersionManagerService } from 'app/main/apps/file-manager/version-manager.service';
import { FileService } from '../services/file.service';
export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}


@Component({
    selector: 'file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerFileListComponent implements OnInit, OnDestroy {
    seltabla:string="";
    files: any;
    filesver: any;
    dataSource: FilesDataSource | null;
    dataSourceaux: FilesDataSource | null;
    pathArr: string[];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns = ['icon', 'NAME', 'TYPE', 'USERID', 'CREATION_DATE'];
    selected: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     * @param {VersionManagerService} _versionManagerService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fileManagerService: FileManagerService,
        private _fuseSidebarService: FuseSidebarService,
        private _versionManagerService: VersionManagerService,
        private _file: FileService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    /*archivos():void{
        this._file.postTrack('asdasd').subscribe(data=>
            {
                
            })
    }*/
    ngOnInit(): void {
        this.dataSource = new FilesDataSource(this._fileManagerService);
        this.dataSourceaux= new FilesDataSource(this._versionManagerService);
        var info = localStorage.getItem('user');
 var  prueba = (JSON.parse(info));
        this._fileManagerService.onFilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(filesu => {
                this.files = this.filterByFather(prueba.empleado.empresa.ruc, filesu);
                console.log(this.files);
            });
            this._versionManagerService.onFilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(filesu => {
                this.filesver = filesu;
                console.log(this.filesver);
            });
        this._fileManagerService.onFileSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
                this.selected = selected;
            });
    }

    filterByFather(aux: String, filesD: any) {
        var auxList: any[] = [];
        
        console.log(filesD);
        for (var i = 0; i < filesD.length; i++) {
            if (filesD[i].INFO.PATH_FATHER == aux) {
                auxList.push(filesD[i]);
                console.log("pATH INGRSASDO");
            }
        }
        console.log(auxList);
        return auxList;
    }

    filterByPATH(aux: String, filesD: any) {
        var auxList: any[] = [];
        console.log(filesD);
        for (var i = 0; i < filesD.length; i++) {
            if (filesD[i].INFO.PATH == aux) {
                auxList.push(filesD[i]);
                console.log("pATH INGRSASDO");
            }
        }
        console.log(auxList);
        return auxList;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On select
     *
     * @param selected
     */
    onSelect(selected): void {
        this._fileManagerService.onFileSelected.next(selected);
    }

    /**
     * On select
     *
     * @param selected
     */
    onRowDblclicked(selected): void {
        if (selected.INFO.TYPE == 'CAR') {
           
            this._fileManagerService.onFilesChanged
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(filesu => {
                    this.files = this.filterByFather(selected.INFO.PATH, filesu);
                    
                    console.log(this.files);
                });
                
            console.log('Doble Click');
            console.log(this.files);
        }
        
        if(selected.INFO.TYPE=="CAR"){
            this.pathArr = (selected.INFO.PATH_FATHER+'/'+selected.INFO.NAME).split('/');
          }else{
            this.pathArr = selected.INFO.PATH_FATHER.split('/');
          }
    }
    Atras(): void {

        this._fileManagerService.onFilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(filesu => {
                var aux = this.files[0].INFO.PATH_FATHER.split('/');
                var PATH: String = "";
                if (aux.length > 1) {
                    for (var i = 0; i < (aux.length - 1); i++) {
                        PATH += aux[i];
                        if (i < (aux.length - 2))
                            PATH += '/';
                    }
                    console.log(PATH);
                    this.files = this.filterByFather(PATH, filesu);
                    console.log(this.files);
                }
            });
        console.log('Doble Click');
        console.log(this.files);

    }
    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     */
    constructor(
        private _fileManagerService: FileManagerService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._fileManagerService.onFilesChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
export class CdkVirtualScrollOverviewExample {
    items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  }