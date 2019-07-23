import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';import { catchError } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {
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
  private _employee: ProductService
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
      nombre: [''],
      categoria: [''],
      precio:  [''],
      descripcion: ['']
    });
    this.activateR.params.subscribe(params => {
      const info = localStorage.getItem('user');
      // tslint:disable-next-line:no-unused-expression
      const cedula = params['id'];
      if (cedula !== 'new') {
        this.flat = false;
const data = this._employee.getByCodigo(cedula).subscribe(arg => {
          this.form = this._formBuilder.group({
            cod_producto: [cedula],
            nombre: [arg.nombre],
            categoria: [arg.categoria],
            precio:  [arg.precio],
            descripcion: [arg.descripcion]
          });
      
      });
        
      } else {
        this.form.setValue({

            nombre: [''],
            categoria: [''],
            precio:  [''],
            descripcion: ['']
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
 this._employee.put(this.form.value).subscribe(data => {
      });
    }
  }
  
  
}
