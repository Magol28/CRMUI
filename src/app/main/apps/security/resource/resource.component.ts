import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
    selected = 'Unavailable';
    disableSelect = new FormControl(false);
    form: FormGroup;
    resources: any[];
    selectedOptions = [];
    selectedOption;
    flat = true;
  
  
    // Private
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      private activateR: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private _employee: EmployeeService
    ) {
      // Set the private defaults
      
    }
  
   
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
  
    /**
     * On init
     */
    ngOnInit(): void {
      
      this.form = this._formBuilder.group({
        cedula: [''],
        nombre: [''],
        fecha_nacimiento: [''],
        direccion: [''],
        telefono: [''],
        email: [''],
        sexo: [''],
        empresa: [''],
      });
      this.activateR.params.subscribe(params => {
        // tslint:disable-next-line:no-unused-expression
        const cedula = params['id'];
        if (cedula !== 'new') {
          this.flat = false;
          const data = this._employee.getByCedula(cedula).subscribe(arg => {
            this.form.setValue({
              cedula: arg.cedula,
              nombre: arg.nombre,
              fecha_nacimiento: arg.fechaNacimiento,
              email: arg.email,
              direccion: arg.direccion,
              telefono: arg.telefono,
              sexo: 'M',
              empresa: 'hola'
            });
        
        });
        
        }
        });
    }
  
    onNgModelChange($event): void {
      console.log($event);
      this.selectedOption = $event;
    }
    guardar(): void {
      if (this.flat) {
        this._employee.post(this.form.value).subscribe(arg => {
          
        });
        
      } else {
        this._employee.put(this.form.value).subscribe(arg => {
          
        });
      }
    }
    
    
}
