import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { fuseAnimations } from "@fuse/animations";

import { Router } from "@angular/router";
import { ClientCampaingService } from "../services/client-campaing.service";
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators
} from "@angular/forms";

@Component({
    selector: "app-client-campaing",
    templateUrl: "./client-campaing.component.html",
    styleUrls: ["./client-campaing.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ClientCampaingComponent implements OnInit {
    displayedColumns: string[] = [
        "Id",
        "Email",
        "FullName",
        "DNI",
        "Earnings",
        "Provincia",
        "Gender",
        "Birth_date"
    ];
    dataSource: MatTableDataSource<any>;

    form: FormGroup;
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    resources: any[];
    flatError: boolean;
    flatTable: boolean;
    campaignList = [];
    selected = "";
    opcionSeleccionado: string = "S";
    disableSelect = new FormControl(false);

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private _formBuilder: FormBuilder,
        private _employee: ClientCampaingService,
        private router: Router
    ) {
        // Create 100 users

        this._employee.getCampaign().subscribe(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                this.campaignList.push(data[i]);
            }
        });
    }

    // tslint:disable-next-line:typedef
    ngOnInit() {
        this.flatError = false;
        this.flatTable = false;
        this.form = this._formBuilder.group({
            campaing: ["", Validators.required]
        });
    }

    // tslint:disable-next-line:typedef
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    search(): void {
        this._employee.getAll(this.form.value.campaing).subscribe(data => {
            if (data.length == 0) {
                this.flatError = true;
                this.flatTable = false;
            } else {
                this.flatTable = true;
            }
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].gender === "M" || data[i].gender === "m") {
                    data[i].gender = "Male";
                } else {
                    data[i].gender = "Female";
                }
            }

            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
}
