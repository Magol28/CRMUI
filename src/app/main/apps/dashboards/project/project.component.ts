import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';

import { ProjectDashboardService } from 'app/main/apps/dashboards/project/project.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { ActivatedRoute, Router } from '@angular/router';

import { SalesService } from '../../scrumboard/services/sales.service';

const { getSalesById } = SalesService.prototype;

@Component({
    selector     : 'project-dashboard',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProjectDashboardComponent implements OnInit
{
    nom : String;
    projects: any[];
    selectedProject: any;
    meetings:any [];

    tasks=[];
    meeting=[];
    communications=[];
    quotations=[];
    
    dialogRef: any;

    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};

    dateNow = Date.now();

    @Input()
    list;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: ProjectDashboardService,
        private router : ActivatedRoute,
        private router2 : Router,
        private getSales : SalesService,
        //private _matDialog: MatDialog
    )
    {
        

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : false,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange  : 'TW',
            xAxis         : false,
            yAxis         : false,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve         : shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.projects = this._projectDashboardService.projects;
        this.router.params.subscribe(params => {
            const id = params['id'];
            this.getSales.getSalesById(id)
                .subscribe(data => {
                    alert(data.sale.name);
                    this.selectedProject = data.sale;
                    this.widgets = this._projectDashboardService.widgets;
                });
                this.getSales.getMeetingsBySale(id).subscribe(data=>{
                    console.log(data.tasks)
                   this.meeting=data.tasks;
                })
                this.getSales.getCommunicationsBySale(id).subscribe(data=>{
                    console.log(data.tasks)
                   this.communications=data.tasks;
                })
                this.getSales.getQuotationsBySale(id).subscribe(data=>{
                    console.log(data)
                   this.quotations=data;
                })
        });

        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11);

        this.router.params.subscribe(data => {
            this.nom = data['id'];
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    informacionCard (id: number){
        this.router2.navigate(['/apps/dashboards/project/info','Silvi']);
    };

    

}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11)
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}


