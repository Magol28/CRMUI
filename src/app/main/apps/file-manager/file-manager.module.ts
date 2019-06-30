import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import {ModalModule} from 'ngx-bootstrap/modal';
import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';
import { FileManagerComponent } from 'app/main/apps/file-manager/file-manager.component';
import { FileManagerDetailsSidebarComponent } from 'app/main/apps/file-manager/sidebars/details/details.component';
import { FileManagerFileListComponent } from 'app/main/apps/file-manager/file-list/file-list.component';
import { FileManagerMainSidebarComponent } from 'app/main/apps/file-manager/sidebars/main/main.component';
import { SharedComponent } from './sidebars/shared/shared.component';
import { VersionComponent } from './sidebars/version/version.component';
import { FileDropDirective } from './directive/file-drop.directive';
import { UploadFormComponent } from './componets/upload-form/upload-form.component';
import { NgxFileDropModule } from 'ngx-file-drop';

const routes: Routes = [
    {
        path: '**',
        component: FileManagerComponent,
        children: [],
        resolve: {
            files: FileManagerService
        }
    }
];

@NgModule({
    declarations: [
        FileManagerComponent,
        FileManagerFileListComponent,
        FileManagerMainSidebarComponent,
        FileManagerDetailsSidebarComponent,
        SharedComponent,
        VersionComponent,
        FileDropDirective,
        UploadFormComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        ModalModule.forRoot(),
        MatRippleModule,
        MatSlideToggleModule,
        MatTableModule,

        FuseSharedModule,
        FuseSidebarModule,
        NgxFileDropModule
    ],
    providers: [
        FileManagerService
    ]
})
export class FileManagerModule {
}
