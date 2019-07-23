import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { RegisterService } from '../../services/register.service';

@Component({
    selector     : 'register',
    templateUrl  : './register.component.html',
    styleUrls    : ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy
{
    registerForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _register: RegisterService
    )
    {
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this.registerForm = this._formBuilder.group({
            nombre: ['', Validators.required],
            ruc: ['', Validators.required],
            razonSocial: ['', Validators.required],
            direccion: ['', Validators.required],
            telefono           : ['', Validators.required],
            email          : ['', [Validators.required]],
            password       : ['', Validators.required],
        });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    register(): void{
        
        const objeto = {
            nombre: this.registerForm.controls['nombre'].value,
            ruc: this.registerForm.controls['ruc'].value,
            razonSocial: this.registerForm.controls['razonSocial'].value,
            direccion: this.registerForm.controls['direccion'].value,
            telefono: this.registerForm.controls['telefono'].value,
            email: this.registerForm.controls['email'].value
          //  password: this.registerForm.controls['password'].value
        };
        console.log(objeto);
        this._register.post(objeto).subscribe(error => {
            
        });
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {passwordsNotMatching: true};
};

