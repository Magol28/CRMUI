import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FileService } from '../file-manager/services/file.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';
import { FormBuilder } from '@angular/forms';
import { AfterViewInit, ComponentFactoryResolver, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations/index';
import { FuseCopierService } from '@fuse/services/copier.service';
import { Validators } from '@angular/forms';




export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class FileManagerComponent implements OnInit, OnDestroy {
  animal: string;
  name: string;
  nombre: string = '';
  form: FormGroup;
  selected: any;
  pathArr: string[];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FileManagerService} _fileManagerService
   * @param {FuseSidebarService} _fuseSidebarService
   * @param {FileService} _fileService
   */
  constructor(
    private _fileManagerService: FileManagerService,
    private _fuseSidebarService: FuseSidebarService,
    private _fileService: FileService,
    private fb: FormBuilder,
    public dialog: MatDialog


  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.form = this.fb.group({
      name: 'Jose'
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewCarpetaDialog, {
      width: '250px',
      data: { name: "JOSE" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  /**
   * On init
   */
  ngOnInit(): void {
    var info = localStorage.getItem('user');
    var prueba = (JSON.parse(info));
    this.pathArr = prueba.empleado.empresa.ruc.split('/');
    this._fileManagerService.onFileSelected
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selected => {
        this.selected = selected;
        console.log(this.selected);

        
          if (selected.INFO.TYPE == "CAR") {
            this.pathArr = (selected.INFO.PATH_FATHER + '/' + selected.INFO.NAME).split('/');
          } else {
            this.pathArr = selected.INFO.PATH_FATHER.split('/');
          }
        

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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
  public files: NgxFileDropEntry[] = [];
  public file;
  public dt;

  public dropped(files: NgxFileDropEntry[], variable: String) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          //  console.log(droppedFile.relativePath, file);
          this.file = file;
          this.dt = new Date(file.lastModified);
          this._fileService.postTrack(file, droppedFile.relativePath, variable);
          
          

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public carpeta() {
    console.log('Sube Carpeta');
    console.log(this.pathArr);


    this._fileService.agregacar(this.nombre, this.pathArr);

  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview/dialog-overview-example-dialog.html',
})
export class DialogOverviewCarpetaDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewCarpetaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
