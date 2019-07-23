import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'app/main/apps/scrumboard/services/sales.service';
import { runInThisContext } from 'vm';

@Component({
    selector     : 'scrumboard-board-add-card',
    templateUrl  : './add-card.component.html',
    styleUrls    : ['./add-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ScrumboardBoardAddCardComponent
{
    formActive: boolean;
    form: FormGroup;
    sale: any;

    @Input()
    cardId;

    @Output()
    cardAdded: EventEmitter<any>;

    @ViewChild('nameInput', {static: false})
    nameInputField;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _sale: SalesService
    )
    {
        // Set the defaults
        this.formActive = false;
        this.cardAdded = new EventEmitter();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    

    

    /**
     * Open the form
     */
    openForm(): void
    {
        console.log("esta es la venta");
        console.log(this.cardId);
        this.form = this._formBuilder.group({
            name: [''],
            description: [''],
            idCompany: ['']
        });
        this.formActive = true;
        this.focusNameField();
    }

    /**
     * Close the form
     */
    closeForm(): void
    {
        this.formActive = false;
    }

    /**
     * Focus to the name field
     */
    focusNameField(): void
    {
        setTimeout(() => {
            this.nameInputField.nativeElement.focus();
        });
    }

    /**
     * On form submit
     */
    onFormSubmit(): void
    {            
        const data = 
        {sale: {            
            name: this.form.getRawValue().name,
            description: this.form.getRawValue().description,
            idCompany: this.form.getRawValue().idCompany
        }};
        if ( this.form.valid ){
        this._sale.postSale(data).subscribe(data => {
            console.log(data);
            this.cardAdded.next(data);
            this.formActive = false;
        });
    }
    }
}


