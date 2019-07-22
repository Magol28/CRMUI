import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../../../services/sales.service';
import * as moment from 'moment';



@Component({
    selector     : 'scrumboard-board-card',
    templateUrl  : './card.component.html',
    styleUrls    : ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ScrumboardBoardCardComponent implements OnInit
{
    @Input()
    cardId;

    sales: any;
    card: any;
    board: any;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _getSalesBySeller: SalesService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.board = this._activatedRoute.snapshot.data.board;
        this.card = this.board.cards.filter((card) => {
            return this.cardId === card.id;
        })[0];

        this._getSalesBySeller.getSalesBySeller("1723954093")
            .subscribe( respuesta =>{                
                this.sales=respuesta.foundSales;                
            }); 
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Is the card overdue?
     *
     * @param cardDate
     * @returns {boolean}
     */
    isOverdue(cardDate): boolean
    {
        return moment() > moment(new Date(cardDate));
    }
}
