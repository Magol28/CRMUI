import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Subject } from 'rxjs';
import { ResourceService } from '../services/resource.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy
{
  selected = 'Unavailable';
  disableSelect = new FormControl(false);
  form: FormGroup;
  resources: any[] ;
  selectedOptions = [];
  selectedOption;
  


    // Private
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      private _formBuilder: FormBuilder,
      private resource: ResourceService
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
    ngOnInit(): void {
        // this.resource.getAll().subscribe(data => {
        //     this.typesOfShoes = data
        // });
        // Reactive Form
        this.form = this._formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onNgModelChange($event): void{
      console.log($event);
      this.selectedOption = $event;
    }
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
