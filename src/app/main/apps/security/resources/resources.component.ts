import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';

import {Router} from '@angular/router';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ResourcesComponent  implements OnInit {
  displayedColumns: string[] = [ 'name', 'population', 'alpha2Code'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _profileS: ProfileService,
              private router: Router) {
    // Create 100 users
    this._profileS.getAll().subscribe(data => {
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
    this.router.navigate(['/apps/security/employee', id]);
  }
}
