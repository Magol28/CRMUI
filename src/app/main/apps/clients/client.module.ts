import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { MatCheckboxModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import { FuseSharedModule } from '@fuse/shared.module';
import { ClientsComponent } from './clients.component';

const routes: Routes = [
    {
        path     : '**',
        component: ClientsComponent
    }
];

@NgModule({
    declarations: [
        ClientsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatRadioModule,
        FuseSharedModule,
        MatCheckboxModule
    ]
})
export class AppClientModule
{
}
