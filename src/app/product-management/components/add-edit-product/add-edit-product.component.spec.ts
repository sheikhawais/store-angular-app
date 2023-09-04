import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductComponent } from './add-edit-product.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductsService } from '../../services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AddEditProductComponent', () => {
    let component: AddEditProductComponent;
    let fixture: ComponentFixture<AddEditProductComponent>;
    let productService: ProductsService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AddEditProductComponent],
            imports: [HttpClientTestingModule, MatFormFieldModule, SharedModule, ReactiveFormsModule, NoopAnimationsModule],
            providers: [
                { provide: MatDialogRef, useValue: {
                    close: () => { }
                }},
                { provide: MAT_DIALOG_DATA, useValue: [] },
            ]
        });
        fixture = TestBed.createComponent(AddEditProductComponent);
        component = fixture.componentInstance;
        productService = TestBed.inject(ProductsService);
        httpController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should build the form', () => {
        component.buildForm();
        expect(component.productsForm).toBeTruthy();
    });

    it('should submit the form', () => {
        component.buildForm();
        component.productsForm.controls['title'].setValue('Test');
        component.productsForm.controls['description'].setValue('Test');
        component.productsForm.controls['price'].setValue(1);
        component.productsForm.controls['image'].setValue('Test');
        component.productsForm.controls['category'].setValue('Test');
        component.onSubmit();
        expect(component.productsForm.valid).toBeTruthy();
    });

    it('should submit the form with invalid data', () => {
        component.buildForm();
        component.onSubmit();
        expect(component.productsForm.valid).toBeFalsy();
    });

    it('should update the product', () => {
        component.product = {
            id: 1,
            title: 'Test',
            description: 'Test',
            price: 1,
            image: 'Test',
            category: 'Test'
        };
        spyOn<any>(productService, 'updateProduct').and.returnValue(of({}));
        component.buildForm();
        component.onSubmit();
        expect(component.productsForm.valid).toBeTruthy();
        expect(productService.updateProduct).toHaveBeenCalled();

    });

    it('should throw an error when updating the product', () => {
        component.product = {
            id: 1,
            title: 'Test',
            description: 'Test',
            price: 1,
            image: 'Test',
            category: 'Test'
        };
        spyOn<any>(productService, 'updateProduct').and.returnValue(throwError(new HttpErrorResponse({})));
        component.buildForm();
        component.onSubmit();
        expect(component.productsForm.valid).toBeTruthy();
    });

    it('should add the product', () => {
        component.product = {
            id: 0,
            title: 'Test',
            description: 'Test',
            price: 1,
            image: 'Test',
            category: 'Test'
        };
        spyOn<any>(productService, 'addProduct').and.returnValue(of({}));
        component.buildForm();
        component.onSubmit();
        expect(component.productsForm.valid).toBeTruthy();
        expect(productService.addProduct).toHaveBeenCalled();
    });

    it('should throw an error when adding the product', () => {
        component.product = {
            id: 0,
            title: 'Test',
            description: 'Test',
            price: 1,
            image: 'Test',
            category: 'Test'
        };
        spyOn<any>(productService, 'addProduct').and.returnValue(throwError(new HttpErrorResponse({})));
        component.buildForm();
        component.onSubmit();
        expect(component.productsForm.valid).toBeTruthy();
    });

    
});
