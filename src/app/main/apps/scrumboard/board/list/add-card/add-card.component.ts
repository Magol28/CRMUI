import { Component, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'app/main/apps/scrumboard/services/sales.service';

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
        {"sale": {            
            "name": this.form.getRawValue().name,
            "description": this.form.getRawValue().description,
            "idCompany": this.form.getRawValue().idCompany
        }};
        console.log("Entrooooo****");
        console.log(this.form.value); 
        if ( this.form.valid ){
        this._sale.postSale(this.form.value).subscribe(data => {
            console.log(data);
        });
    }
    }

    

     /*    if ( this.form.valid )
        {
            const cardName = this.form.getRawValue().name;
            this.cardAdded.next(cardName);
            this.formActive = false;
        } */



    }


