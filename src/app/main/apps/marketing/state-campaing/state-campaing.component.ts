import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { fuseAnimations } from "@fuse/animations";

import { Router } from "@angular/router";
import { StateCampaingService } from "../services/state-campaing.service";

@Component({
    selector: "app-state-campaing",
    templateUrl: "./state-campaing.component.html",
    styleUrls: ["./state-campaing.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class StateCampaingComponent implements OnInit {
    displayedColumns: string[] = [
        "id",
        "name",
        "state",
        "stage",
        "ager_range",
        "budget",
        "gender_range",
        "description"
    ];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private _campaing: StateCampaingService,
        private router: Router
    ) {
        this._campaing.getAll().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    ngOnInit() {}

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    search(id: string): void {
        this.router.navigate(["/apps/marketing/stateCampaingDetail", id]);
    }
}
