import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  selected = 'Unavailable';
  fecha: Date;
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
      fechaNacimiento:  [''],
      direccion: [''],
      telefono: [''],
      email: [''],
      sexo: [''],
      empresa: ['ESPE'],
    });
    this.activateR.params.subscribe(params => {
      const info = localStorage.getItem('user');
      // tslint:disable-next-line:no-unused-expression
      const cedula = params['id'];
      if (cedula !== 'new') {
        this.flat = false;
        const data = this._employee.getByCedula(cedula).subscribe(arg => {
          if (arg.sexo === 'M') {
            this.selected = 'Men';
          } else {
            this.selected = 'Women';
          }
          const fecha = new Date(arg.fechaNacimiento);
          let fechaN: string ;
          if (fecha.getMonth() < 10) {
             fechaN = fecha.getFullYear() + '-0' + fecha.getMonth() + '-' + fecha.getDate();
          }else{
             fechaN = fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate();
          }
          
          this.form.setValue({
            cedula: arg.cedula,
            nombre: arg.nombre,
            fechaNacimiento: fechaN,
            email: arg.email,
            direccion: arg.direccion,
            telefono: arg.telefono,
            sexo: this.selected,
            empresa: 'ESPE'
          });
      
      });
        
      } else {
        this.form.setValue({
          cedula: '',
          nombre: '',
          fechaNacimiento: '',
          email: '',
          direccion: '',
          telefono: '',
          sexo: '',
          empresa: 'ESPE'
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
      this._employee.post(this.form.value).subscribe(data => {
        
      });
      
    } else {
      this._employee.put(this.form.value).subscribe(arg => {
        
      });
    }
  }
  
  
}
