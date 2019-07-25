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

import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { ResourcesComponent } from './resources/resources.component';
import { ResourceComponent } from './resource/resource.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilesComponent } from './profiles/profiles.component';

import { MatListModule } from '@angular/material/list';
import { ResourceService } from './services/resource.service';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { EmployeeService } from './services/employee.service';
import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service';
import { AuthGuard } from '../../../guards/auth.guard';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
const routes: Routes = [
    {
        path     : 'resources',
        component: ResourcesComponent,
        data: { roles: ['resource'] }
    },
    {
        path     : 'resource/:id',
        component: ResourcesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Security'] }
    },
    {
        path     : 'profile/:id',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Security'] }
    },
    {
        path     : 'profiles',
        component: ProfilesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Security'] }
    },
    {
        path     : 'employee/:id',
        component: EmployeeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Security'] }
    },
    {
        path     : 'employees',
        component: EmployeesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Security'] }
    }
    ,
    {
        path     : 'user/:id',
        component: UserComponent ,
        canActivate: [AuthGuard],
        data: { roles: ['Security'] }
    },
    {
        path     : 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Security'] }
    }
    ,
    {
        path     : 'product/:id',
        component: ProductComponent ,
        canActivate: [AuthGuard],
        data: { roles: ['Productos'] }
    },
    {
        path     : 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Productos'] }
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
        UsersComponent,
        ProductComponent,
        ProductsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        HttpClientModule,
        HttpClientJsonpModule ,
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
