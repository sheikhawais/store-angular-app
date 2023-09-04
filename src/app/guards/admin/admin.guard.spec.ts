import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Route, Router } from '@angular/router';

import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
    const adminRouteGuard = adminGuard;
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => adminGuard(...guardParameters));
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });

    it('should return true if user is admin', () => {
        spyOn(router, 'navigate');
        localStorage.setItem('isAdmin', 'true');
        expect(executeGuard(new ActivatedRouteSnapshot, {url:'/products/list', root: new ActivatedRouteSnapshot})).toBe(true);
        expect(executeGuard(new ActivatedRouteSnapshot, {url:'/products/shop', root: new ActivatedRouteSnapshot})).toBe(true);
    });

    it('should handle if user is not admin', () => {
        spyOn(router, 'navigate');
        localStorage.setItem('isAdmin', 'false');
        expect(executeGuard(new ActivatedRouteSnapshot, {url:'/products/shop', root: new ActivatedRouteSnapshot})).toBe(true);
        expect(executeGuard(new ActivatedRouteSnapshot, {url:'/products/list', root: new ActivatedRouteSnapshot})).toBe(true);
    });

    

});
