import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HeaderComponent]
        });
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have isAdmin as 'true'`, () => {
        localStorage.setItem('isAdmin', 'true');
        component.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
        expect(component.isAdmin).toBeTruthy();
    });

    it(`should have isAdmin as 'false'`, () => {
        localStorage.clear();
        component.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
        expect(component.isAdmin).toBeFalsy();
    });

    it(`should have isAdmin as 'false' 2`, () => {
        localStorage.setItem('isAdmin', 'false');
        component.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
        expect(component.isAdmin).toBeFalsy();
    });

    it('should call the logout function', () => {
        spyOn(component, 'logout').and.callThrough();
        let button = fixture.debugElement.nativeElement.querySelector('.user-details a');
        button.click();
        expect(component.logout).toHaveBeenCalled();
    });

});
