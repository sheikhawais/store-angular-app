import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, NoopAnimationsModule],
        });
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should login with user credentials', () => {
        const routeSpy = spyOn(router, 'navigate');
        component.email = 'user';
        component.password = 'user';
        component.login();
        fixture.detectChanges();
        expect(localStorage.getItem('isLoggedIn')).toBe('true');
        expect(localStorage.getItem('isAdmin')).toBe('false');
        expect(routeSpy).toHaveBeenCalledWith(['/products/shop']);
    });

    it('should login with admin credentials', () => {
        const routeSpy = spyOn(router, 'navigate');
        component.email = 'admin';
        component.password = 'admin';
        component.login();
        fixture.detectChanges();
        expect(localStorage.getItem('isLoggedIn')).toBe('true');
        expect(localStorage.getItem('isAdmin')).toBe('true');
        expect(routeSpy).toHaveBeenCalledWith(['/products/list']);
    });

    it('should throw error for wrong cred', () => {
        component.email = 'test';
        component.password = 'test';
        component.login();
        fixture.detectChanges();
        expect(component.error).toBe('Invalid credentials');
    });

});
