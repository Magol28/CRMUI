import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label } from "ng2-charts";
import { fuseAnimations } from "@fuse/animations";
import { ReportService } from "../services/report.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-report-campaing",

    templateUrl: "./report-campaing.component.html",
    styleUrls: ["./report-campaing.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ReportCampaingComponent implements OnInit {
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                anchor: "end",
                align: "end"
            }
        }
    };
    public barChartLabels: Label[] = [];
    public barChartLabelsLocation: Label[] = [];
    public barChartPlugins = [pluginDataLabels];

    public barChartType: ChartType = "bar";
    public barChartLegend = true;

    public barChartData: ChartDataSets[] = [{ data: [], label: "Campains" }];
    public barChartDataLocation: ChartDataSets[] = [
        { data: [], label: "Campains" }
    ];
    flatErrorLocation: boolean = false;
    flatErrorClient: boolean = false;

    constructor(private _campaing: ReportService, private router: Router) {
        this._campaing.getClient().subscribe(data => {
            console.log(data);
        });
    }

    ngOnInit() {
        this._campaing.getClient().subscribe(
            data => {
                console.log(data);
                let dataCliente = [];
                if (data.length == 0) {
                    this.flatErrorClient = true;
                } else {
                    this.flatErrorClient = false;
                }
                for (let i = 0; i < data.length; i++) {
                    dataCliente.push(data[i].total_campaigns);
                    this.barChartLabels.push(data[i].name);
                }
                this.barChartData[0].data = dataCliente;
            },
            error => {
                this.flatErrorClient = true;
            }
        );

        this._campaing.getLocation().subscribe(
            data => {
                console.log(data);
                if (data.length == 0) {
                    this.flatErrorLocation = true;
                } else {
                    this.flatErrorLocation = false;
                }
                let dataPronvice = [];
                for (let i = 0; i < data.length; i++) {
                    dataPronvice.push(data[i].ammount);
                    this.barChartLabelsLocation.push(data[i].province);
                }
                this.barChartDataLocation[0].data = dataPronvice;
            },
            error => {
                this.flatErrorLocation = true;
            }
        );
    }

    public chartClicked({
        event,
        active
    }: {
        event: MouseEvent;
        active: {}[];
    }): void {
        console.log(event, active);
    }

    public chartHovered({
        event,
        active
    }: {
        event: MouseEvent;
        active: {}[];
    }): void {
        console.log(event, active);
    }

    public randomize(): void {
        // Only Change 3 values
        this.barChartLabels = [];
        this._campaing.getClient().subscribe(data => {
            let dataCliente = [];
            for (let i = 0; i < data.length; i++) {
                dataCliente.push(data[i].total_campaigns);
                this.barChartLabels.push(data[i].full_name);
            }
            this.barChartData[0].data = dataCliente;
        });
    }
    public updateClient(): void {
        this.barChartLabelsLocation = [];
        this._campaing.getLocation().subscribe(data => {
            let dataPronvice = [];
            for (let i = 0; i < data.length; i++) {
                dataPronvice.push(data[i].ammount);
                this.barChartLabelsLocation.push(data[i].province);
            }
            this.barChartDataLocation[0].data = dataPronvice;
        });
    }
}
