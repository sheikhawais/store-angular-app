import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => authGuard(...guardParameters));
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });

    it('should return true if user is logged in', () => {
        spyOn(router, 'navigate');
        localStorage.setItem('isLoggedIn', 'true');
        expect(executeGuard(new ActivatedRouteSnapshot, {url:'/auth/login', root: new ActivatedRouteSnapshot})).toBe(true);
        expect(executeGuard(new ActivatedRouteSnapshot, {url:'/products/shop', root: new ActivatedRouteSnapshot})).toBe(true);
    });

    it('should return false if user is not logged in', () => {
        spyOn(router, 'navigate');
        localStorage.setItem('isLoggedIn', 'false');
        expect(executeGuard(new ActivatedRouteSnapshot, {url:'/auth/login', root: new ActivatedRouteSnapshot})).toBe(true);
        expect(executeGuard(new ActivatedRouteSnapshot, {url:'/products/list', root: new ActivatedRouteSnapshot})).toBe(false);
    });
});
