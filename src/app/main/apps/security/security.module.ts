import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import {HttpClientModule} from '@angular/common/http';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { ResourcesComponent } from './resources/resources.component';
import { ResourceComponent } from './resource/resource.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilesComponent } from './profiles/profiles.component';

import { MatListModule } from '@angular/material/list';
import { ResourceService } from './services/resource.service';
import { ProfileService } from 'app/main/pages/profile/profile.service';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { EmployeeService } from './services/employee.service';
import { UserService } from './services/user.service';
const routes: Routes = [
    {
        path     : 'resources',
        component: ResourcesComponent
    },
    {
        path     : 'resource/:id',
        component: ResourcesComponent
    },
    {
        path     : 'profile',
        component: ProfileComponent
    },
    {
        path     : 'profiles',
        component: ProfilesComponent 
    },
    {
        path     : 'employee/:id',
        component: EmployeeComponent
    },
    {
        path     : 'employees',
        component: EmployeesComponent
    }
    ,
    {
        path     : 'user',
        component: UserComponent 
    },
    {
        path     : 'users',
        component: UsersComponent
    }
    
];
@NgModule({
    declarations: [
        ResourcesComponent,
        ResourceComponent,
        ProfileComponent,
        ProfilesComponent,
        EmployeesComponent,
        EmployeeComponent,
        UserComponent,
        UsersComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        HttpClientModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatListModule,
        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),
        FuseSharedModule,
        FuseWidgetModule
    ],
    providers:
        [
        ResourceService,
        ProfileService,
        EmployeeService,
        UserService
    ]
})
export class SecurityModule
{
}
