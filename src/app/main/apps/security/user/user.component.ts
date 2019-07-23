import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Subject } from 'rxjs';
import { ResourceService } from '../services/resource.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { EmployeeService } from '../services/employee.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  selected = 'Unavailable';
  flat: boolean;
  disableSelect = new FormControl(false);
  form: FormGroup;
  resources: any[];
  selectedOptions = [];
  selectedOption;
  employeForm: FormGroup;
  employees = [];
  profileForm: FormGroup;
  profiles = [];
  empleados;
  perfiles;  // Private
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private activateR: ActivatedRoute,
    private _profile: ProfileService,
    private _employee: EmployeeService,
    private _user: UserService
  ) {
    // Set the private defaults
    //  this._unsubscribeAll = new Subject();
    this.employeForm = this.fb.group({
      countryControl: ['']
    });
    this.profileForm = this.fb.group({
      countryControl: ['']
    });
    this._employee.getAll()
      .subscribe(arg => {
        this.empleados = arg;
        arg.forEach(element => {
          this.employees.push(element.nombre);
        });
         
      });
    
    this._profile.getAll()
      .subscribe((arg) => {
        this.perfiles = arg;
        arg.forEach(element => {
          this.profiles.push(element.nombre);
        });
         
       
       
      });
  }

  ngOnInit(): void{
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
        
    this.activateR.params.subscribe(params => {
      const parametro = params['id'];
      if (parametro === 'new') {
        this.flat = true;
        return;
      }

      this._user.getByCedula(parametro).subscribe(data => {
        console.log(data);
        this.form = this._formBuilder.group({
          name: [data.nombre],
          password: ['']
        });

        this.employeForm = this.fb.group({
          countryControl: [data.empleado.nombre]
        });
        this.profileForm = this.fb.group({
          countryControl: [data.perfil.nombre]
        });
      });
      
    });
  }

  onNgModelChange($event): void {
    console.log($event);
    this.selectedOption = $event;
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  guardar(): void {
    const empleado = this.employeForm.controls['countryControl'].value;
    const perfil = this.profileForm.controls['countryControl'].value;
    let cedula;
    let id;
    this.empleados.forEach(element => {
        if (element.nombre === empleado) {
          cedula = element.cedula;
         }
      });
    this.perfiles.forEach(element => {
        if (element.nombre === perfil) {
          id = element.id;
          
         }
      });
    if (this.flat) {
     
      this._user.post(this.form.controls['name'].value,
        this.form.controls['password'].value,
        cedula,
        id

      ).subscribe(data => {
        
      });
    } else {
      this._user.put(this.form.controls['name'].value,
        this.form.controls['password'].value,
        cedula,
        id

      ).subscribe(data => {
        
      });
    }
  }
  
}
