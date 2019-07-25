import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Subject } from 'rxjs';
import { ProfileService } from '../services/profile.service';

import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ResourceService } from '../services/resource.service';

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
  resources = []  ;
  selectedOptions = [];
  selectedOption;
  falt: boolean;
  recursos = [];


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
      private _profile: ProfileService,
      private _resouces: ResourceService
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
      
      this._resouces.getAll().subscribe(erg => {
        if (id === 'new') {
          this.falt = true;
          erg.forEach(item => {
            this.recursos.push({
              id: item.id,
              nombre: item.nombre,
              isvalid: false
            });
          });
          console.log('hola');
          
          this.resources = erg;
          return;
        } else {
          this.falt = false;
          erg.forEach(item => {
            this.recursos.push({
              id: item.id,
              nombre: item.nombre,
              isvalid: false
            });
          });
          
          this.resources = erg;
        }
        this._profile.getByCedula(id).subscribe(arg => {
          this.form.setValue({
            name: arg.nombre,
            description: arg.descripcion
          });

          this.selectedOptions = arg.recursos;
          
          const x = this.recursos.length;
          console.log(x);
          for (let i = 0; i < x; i++) {
            if (this.selectedOptions.some(e => e.nombre === this.recursos[i].nombre)) {
              this.recursos[i].isvalid = true;
            }
            
          }
          
        });
        
      });
      
    });
  }

    onNgModelChange($event): void{
      console.log($event);
      this.selectedOption = $event;
    }
  change(id: number): void {
    this.recursos[id].isvalid =  !this.recursos[id ].isvalid ;
  }
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

  guardar(): any {
    const x = this.recursos.length;
    const resourcesArray = [];
    for (let i = 0; i < x; i++) {
      if (this.recursos[i].isvalid) {
              console.log(this.resources);
              const getFruit = this.resources.find(item => item.nombre === this.recursos[i].nombre);
              console.log(getFruit);
              resourcesArray.push(getFruit);
            }
           
    }
    if (this.falt) {
      this._profile.post(this.form.controls['name'].value,
        this.form.controls['description'].value,
        'ATC',
        resourcesArray
      ).subscribe(data => {
      
      });
    }else{
      this._profile.put(this.form.controls['name'].value,
        this.form.controls['description'].value,
        'ATC',
        resourcesArray
      ).subscribe(data => {
      
      });
    }
    console.log(resourcesArray);
  }
}

