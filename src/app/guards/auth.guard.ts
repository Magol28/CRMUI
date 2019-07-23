import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    // tslint:disable-next-line:typedef
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = localStorage.getItem('user');
        if (currentUser) {
            const prueba = (JSON.parse(currentUser));
            const recursos = prueba.perfil.recursos;
            console.log(recursos);
            console.log(route.data.roles);
            if (recursos.some(e => e.nombre === route.data.roles[0])) {
                return true;
            } else {
                this.router.navigate(['/pages/auth/login']);
                return false;
             }
                

            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/pages/auth/login']);
        return false;
    }
}
