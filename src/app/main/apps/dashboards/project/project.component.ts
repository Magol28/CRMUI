import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { SalesService } from '../../scrumboard/services/sales.service';
/* import { ScrumboardService } from 'app/main/apps/scrumboard/scrumboard.service';
import { ScrumboardCardDialogComponent } from 'app/main/apps/scrumboard/board/dialogs/card/card.component';  */

@Component({
    selector     : 'project-dashboard',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProjectDashboardComponent implements OnInit
{
/*     @Input()
    list;
  
    dialogRef: any; */

    tasks=[];
    meetings=[];
    communications=[];
    quotations=[];
    calls=[];
    mails=[];

    constructor(
        private activateR: ActivatedRoute,
        private _sales: SalesService
        )
    {
    }

    ngOnInit(): void
    {
        this.activateR.params.subscribe(params => {
            const cedula = params['id'];
            this._sales.getTaskBySale(cedula).subscribe(data=>{
                console.log(data.tasks)
               this.tasks=data.tasks;
            })
            this._sales.getMeetingsBySale(cedula).subscribe(data=>{
                console.log(data.tasks)
               this.meetings=data.tasks;
            })
            this._sales.getCommunicationsBySale(cedula).subscribe(data=>{
                console.log(data.tasks)
               this.communications=data.tasks;
            })
            this._sales.getCallsBySale(cedula).subscribe(data=>{
                console.log(data.communication)
               this.calls=data.communication;
            })
            this._sales.getQuotationsBySale(cedula).subscribe(data=>{
                console.log(data.quotations)
               this.quotations=data.quotations;
            })
            
        });
    }

    /* openCardDialog(cardId): void
    {
        this.dialogRef = this._matDialog.open(ScrumboardCardDialogComponent, {
            panelClass: 'scrumboard-card-dialog',
            data      : {
                cardId: cardId,
                listId: this.list.id
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {

            });
    } */

}


