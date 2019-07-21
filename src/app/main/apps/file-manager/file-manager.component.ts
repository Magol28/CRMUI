import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FileService } from '../file-manager/services/file.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';

import { AfterViewInit, ComponentFactoryResolver, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';

import { fuseAnimations } from '@fuse/animations/index';
import { FuseCopierService } from '@fuse/services/copier.service';

import { EXAMPLE_COMPONENTS } from 'app/main/angular-material-elements/example-components';




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
    
    public dialog: MatDialog


  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
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
    
    this._fileManagerService.onFileSelected
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selected => {
        this.selected = selected;
        console.log(this.selected);
        //this.pathArr = selected.location.split('>');
      });
  }
0
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

  public dropped(files: NgxFileDropEntry[]) {
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
          this._fileService.postTrack(file, droppedFile.relativePath);
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public carpeta(event) {

    this._fileService.agregacar('jose');

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
