import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
    const _router = inject(Router);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (isAdmin) {
        if (state.url === '/products/shop') { // logged in and trying to access login page
            _router.navigate(['/products/list']);
        }
    } else {
        if (state.url !== '/products/shop') {
            _router.navigate(['/products/shop']);
        }
    }
    return true;
};
