import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementComponent } from './product-management.component';
import { HeaderComponent } from '../shared/components/app-header/header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductManagementComponent', () => {
    let component: ProductManagementComponent;
    let fixture: ComponentFixture<ProductManagementComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProductManagementComponent],
            imports: [HeaderComponent, RouterTestingModule]
        });
        fixture = TestBed.createComponent(ProductManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
