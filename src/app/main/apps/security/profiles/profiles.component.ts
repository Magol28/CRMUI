import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';

import {Router} from '@angular/router';
import { ProfileService } from '../services/profile.service';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ProfilesComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'name', 'description'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _profile: ProfileService ,
              private router: Router) {
    // Create 100 users
    this._profile.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });
    
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
   
  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  search(id: string): void {
    this.router.navigate(['/apps/security/profile', id]);
  }
}

