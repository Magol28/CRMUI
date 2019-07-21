import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Subject } from 'rxjs';
import { ProfileService } from '../services/profile.service';

import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy
{
  selected = 'Unavailable';
  disableSelect = new FormControl(false);
  form: FormGroup;
  resources: any[]  ;
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
      private activateR: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private _profile: ProfileService
    )
    {
        // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['']
  });
    }

 
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
      this.activateR.params.subscribe(params => { 
        const id = params['id'];
        this._profile.getByCedula(id).subscribe(arg => {
          this.form.setValue({
            name: arg.nombre,
            description: arg.descripcion
          });
          this.resources = arg.recursos;
          this.selectedOptions = arg.recursos;
        });
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

