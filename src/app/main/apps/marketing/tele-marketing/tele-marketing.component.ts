import {
    Component,
    OnInit,
    NgModule,
    ViewEncapsulation,
    ViewChild
} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { ReportService } from "../services/report.service";
import { ReportCampaingService } from "../services/report-campaing.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Router } from "@angular/router";

@Component({
    selector: "app-tele-marketing",
    templateUrl: "./tele-marketing.component.html",
    styleUrls: ["./tele-marketing.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class TeleMarketingComponent implements OnInit {
    displayedColumns: string[] = [
        "id",
        "dni",
        "full_name",
        "gender",
        "email",
        "birth_date",
        "earnings",
        "location"
    ];
    dataSource: MatTableDataSource<any>;

    form: FormGroup;
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    resources: any[];
    advisorList = [];
    campaignList = [];
    selected = "";
    flatError: boolean = false;
    flatTable: boolean = false;
    opcionSeleccionado: string = "S";
    disableSelect = new FormControl(false);

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private _formBuilder: FormBuilder,
        private _report: ReportCampaingService,
        private router: Router
    ) {
        this._report.getAdvisor().subscribe(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                this.advisorList.push(data[i]);
            }
        });

        this._report.getCampaign().subscribe(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                this.campaignList.push(data[i]);
            }
        });
    }
    ngOnInit() {
        this.form = this._formBuilder.group({
            advisor: ["", Validators.required],
            campaign: ["", Validators.required]
        });
    }

    ReportAdvisorCampaign(): void {
        console.log(this.form.value);
        this._report.getAdvisorCampaign(this.form.value).subscribe(
            data => {
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                if (data.length == 0) {
                    this.flatError = true;
                    this.flatTable = false;
                } else {
                    this.flatError = false;
                    this.flatTable = true;
                }
            },
            onError => {
                this.flatError = true;
            }
        );
    }

    search(idClient: string): void {
        this.router.navigate([
            "/apps/marketing/telemarketingDetail",
            idClient,
            this.form.value.advisor,
            this.form.value.campaign
        ]);
    }
}
