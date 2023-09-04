import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

    const _router = inject(Router);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        if (state.url === '/auth/login') { // logged in and trying to access login page
            _router.navigate(['/products/list']);
        }
        return true;
    } else {
        if (state.url === '/auth/login') {
            return true;
        } else {
            _router.navigate(['/auth/login']);
        }
        return false;
    }
};
