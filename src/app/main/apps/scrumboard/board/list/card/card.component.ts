import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    card: any;
    board: any;
    sale:any;
    sales:any;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     */
    constructor(
        private _activatedRoute: ActivatedRoute
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
        this.card = this.cardId;
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
