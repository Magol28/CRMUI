import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';

import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [ 'nombre', 'perfil', 'empleado'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _employee: UserService ,
              private router: Router) {
    // Create 100 users
    this._employee.getAll().subscribe(data => {
      const info = localStorage.getItem('user');
      const prueba = (JSON.parse(info));
      const _info = [];
      data.forEach(item => {
        if (item.empleado.empresa.ruc === prueba.empleado.empresa.ruc) {
          _info.push(item);
      }
      });
      this.dataSource = new MatTableDataSource(_info);
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
    this.router.navigate(['/apps/security/user', id]);
  }
}




