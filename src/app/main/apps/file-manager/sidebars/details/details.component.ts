import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { fuseAnimations } from '@fuse/animations';
import { FileService } from 'app//main/apps/file-manager/services/file.service';
import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';


@Component({
    selector: 'file-manager-details-sidebar',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    animations: fuseAnimations
})
export class FileManagerDetailsSidebarComponent implements OnInit, OnDestroy {
    selected: any;
    versions: any;
    modalRef: BsModalRef;
    dataSource: FilesDataSource | null;
    dataSourceVersion: any | null;
    operacionSeleccionada: string = '';
    displayedColumns = ['VersionId', 'LastModified','radio'];
    info = localStorage.getItem('user');
  prueba = (JSON.parse(this.info));
    
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     * @param {FileManagerService} _fileManagerService
     * @param {FileService} _fileService
     */
    constructor(
        private _fileManagerService: FileManagerService,
        private modalService: BsModalService,
        private _fileService: FileService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    public openModal(template: TemplateRef<any>) {
        console.log('modales');
        console.log(this.modalService.getModalsCount());
        var data=this.modalService.getModalsCount();
        if(data==0)
            this.modalRef = this.modalService.show(template);
    
        
    }
    refresh(): void {
        window.location.reload();
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.dataSource = new FilesDataSource(this._fileManagerService);
        
        this._fileManagerService.onFileSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
                this.selected = selected;
            });
            
          
    }
    
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    async descargar(path:String,nombre:String): Promise<void> {
            var nom:string=''+nombre;
            var aux = path.split('/');

            var PATH: string = "http://25.76.59.152:3000/documentfolder/";

            for (var i = 0; i < aux.length; i++) {
                PATH += aux[i];
                if (i < (aux.length-1))
                    PATH += '%2F';
            }
            PATH+='/'+this.prueba.empleado.nombre;
            console.log(PATH);
            const blob = await this._fileService.descarga(PATH);
            let dataType = blob.type;
            let binaryData = [];
            binaryData.push(blob);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (nom)
                downloadLink.setAttribute('download', nom);
            document.body.appendChild(downloadLink);
            downloadLink.click();

        
    }
    cambiarversion(dato:String){
        var aux=dato.split('/');
        dato="";
        for(var i=0;i<aux.length;i++){
            dato+=aux[i];
            if(i<(aux.length-1))
            dato+='%2F';
        }
        
        this._fileService.cambiarversion(dato,this.operacionSeleccionada);
        console.log("datos versionado")
       
        console.log(this.operacionSeleccionada);
    }
    async version(dato:String):Promise<void>{
        var aux=dato.split('/');
        dato="";
        for(var i=0;i<aux.length;i++){
            dato+=aux[i];
            if(i<(aux.length-1))
            dato+='%2F';
        }
        
        this.dataSourceVersion =await this._fileService.versiones(dato);
        
        await console.log("datos vrsion")
        await       console.log(this.dataSourceVersion)
              

    }
    
    async eliminar(dato:String):Promise<void>{
        var aux=dato.split('/');
        dato="";
        for(var i=0;i<aux.length;i++){
            dato+=aux[i];
            if(i<(aux.length-1))
            dato+='%2F';
        }
        
        this._fileService.eliminar(dato,'ICT');
        await console.log("datos eliminados")
       
              

    }
    async restaurar(dato:String):Promise<void>{
        var aux=dato.split('/');
        dato="";
        for(var i=0;i<aux.length;i++){
            dato+=aux[i];
            if(i<(aux.length-1))
            dato+='%2F';
        }
        
        this._fileService.eliminar(dato,'ACT');
        await console.log("datos eliminados")
        
              

    }
    async fisico(dato:String):Promise<void>{
        var aux=dato.split('/');
        dato="";
        for(var i=0;i<aux.length;i++){
            dato+=aux[i];
            if(i<(aux.length-1))
            dato+='%2F';
        }
        
        this._fileService.fisico(dato);
        await console.log("datos eliminados")
       
              

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