import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';
import { takeUntil } from 'rxjs/internal/operators';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ProfilesComponent  implements OnInit
{
    displayedColumns = ['id', 'name', 'name1', 'name2', 'name3'];
  resources: any[] ;


    constructor(
        private _resurceS: ProfileService
    )
    {
        // Set the private defaults
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        
        this.resources = this._resurceS.getAll();
    }


}
