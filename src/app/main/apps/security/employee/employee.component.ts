import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  selected = 'Unavailable';
  disableSelect = new FormControl(false);
  form: FormGroup;
  resources: any[];
  selectedOptions = [];
  selectedOption;
  


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
        const data = this._employee.getByCedula(cedula).subscribe(arg => {
      console.log(arg);
      
      });
      
      }
      });
  }

  onNgModelChange($event): void {
    console.log($event);
    this.selectedOption = $event;
  }
  
}
