import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {
    constructor(private storageService: StorageService, private router: Router) { }

    canActivateAdmin(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.storageService.isLoggedIn()) {
            if (this.storageService.isAdmin()) {
                return true;
            }
            this.router.navigate(['/login']);
            return false;
        } else {
            // Redirect to the login page if the user is not authenticated
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivateAdmin(next, state);
}