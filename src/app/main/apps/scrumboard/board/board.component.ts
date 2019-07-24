import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ScrumboardService } from 'app/main/apps/scrumboard/scrumboard.service';
import { SalesService } from 'app/main/apps/scrumboard/services/sales.service';


import { List } from 'app/main/apps/scrumboard/list.model';

@Component({
    selector     : 'scrumboard-board',
    templateUrl  : './board.component.html',
    styleUrls    : ['./board.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class ScrumboardBoardComponent implements OnInit, OnDestroy
{
    board: any;
    nombreUsuario = "Selena";
    sales: any;
    sale: any;
    dialogRef: any;
    form: FormGroup;

    @Input()
    list;

    cedula= "1726781584";
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _location: Location,
        private _scrumboardService: ScrumboardService,
        private _getSalesBySeller: SalesService,
        private _matDialog: MatDialog
        
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._getSalesBySeller.getSalesBySeller(this.cedula)
        .subscribe( respuesta =>{               
            this.sales = filterSales(respuesta.foundSales);
            console.log(respuesta.foundSales);
        });

        this._scrumboardService.onBoardChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(board => {
                this.board = board;
                this.board.lists[0].name = "Habilitado para la venta";
                this.board.lists[1].name = "Negociacion";
                this.board.lists[2].name = "Acuerdo";
                this.board.lists[3].name = "Listo para venta";
                this.board.lists[4].name = "Cerrado";  
            });

    }



    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On list add
     *
     * @param newListName
     */
    onListAdd(newListName): void
    {
        if ( newListName === '' )
        {
            return;
        }

        this._scrumboardService.addList(new List({name: newListName}));
    }

    /**
     * On board name changed
     *
     * @param newName
     */
    onBoardNameChanged(newName): void
    {
        this._scrumboardService.updateBoard();
        this._location.go('/apps/scrumboard/boards/' + this.board.id + '/' + this.board.uri);
    }

    /**
     * On drop
     *
     * @param ev
     */
    onDrop(ev, card): void
    {
        console.log(card);
        this._scrumboardService.updateBoard();
    }

    /**
     * Open card dialog
     *
     * @param cardId
     */
    openCardDialog(cardId): void
    {
        this.dialogRef = this._matDialog.open(ScrumboardBoardComponent, {
            panelClass: 'scrumboard-card-dialog',
            data      : {
                cardId: cardId,
                listId: this.list.id
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {

            });
    }
}

const phases = [
    "Habilitado para la venta",  
    "Negociacion",        
    "Acuerdo",
    "Listo para venta",                 
    "Cerrado",
]
const filterSalsesByPhase = (sale,phase) => sale.phase === phase;

const filterSales = (sales) => {
    const filteredSales = phases.map(phase => sales.filter(sale => filterSalsesByPhase(sale,phase)));
    return filteredSales;
}