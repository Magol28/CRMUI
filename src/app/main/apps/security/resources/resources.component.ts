import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ResourcesComponent implements OnInit
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
