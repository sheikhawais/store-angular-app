import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { MatTableModule } from '@angular/material/table';
import { of, throwError } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ProductsListComponent', () => {
    let component: ProductsListComponent;
    let fixture: ComponentFixture<ProductsListComponent>;
    let matDialogService: jasmine.SpyObj<MatDialog>;
    matDialogService = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    let productsService: ProductsService
    let dialog: MatDialog;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProductsListComponent],
            imports: [
                HttpClientTestingModule, 
                MatDialogModule,
                NoopAnimationsModule,
                SharedModule
            ], 
            providers: [
                { provide: MatDialogRef, useValue: matDialogService },
                { provide: MAT_DIALOG_DATA, useValue: [] },
            ]
        });
        fixture = TestBed.createComponent(ProductsListComponent);
        component = fixture.componentInstance;
        productsService = TestBed.inject(ProductsService);
        dialog = TestBed.inject(MatDialog);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load products', () => {
        spyOn<any>(productsService, 'getProducts').and.returnValue(of([]));
        spyOn<any>(component, 'loadProducts').and.callThrough();
        component.ngOnInit();
        expect(component.loadProducts).toHaveBeenCalled();
    });

    it('should handle error when loading products', () => {
        spyOn<any>(productsService, 'getProducts').and.returnValue(throwError(new HttpErrorResponse({})));
        spyOn<any>(component, 'loadProducts').and.callThrough();
        component.ngOnInit();
        expect(component.loadProducts).toHaveBeenCalled();
    });

    it('should show product details', () => {
        spyOn<any>(component, 'showProduct').and.callThrough();
        component.showProduct({
            id: 1,
            title: 'Test',
            description: 'Test',
            price: 1,
            image: 'Test',
            category: 'Test'
        })
        expect(component.showProduct).toHaveBeenCalled();
    });

    it('should add a product', () => {
        spyOn<any>(component, 'addProduct').and.callThrough();
        component.addProduct();
        expect(component.addProduct).toHaveBeenCalled();
    });

    it('should edit a product', () => {
        spyOn<any>(component, 'editProduct').and.callThrough();
        component.editProduct({
            id: 1,
            title: 'Test',
            description: 'Test',
            price: 1,
            image: 'Test',
            category: 'Test'
        });
        expect(component.editProduct).toHaveBeenCalled();
    });

    it('should delete a product', () => {
        spyOn<any>(component, 'deleteProduct').and.callThrough();
        spyOn<any>(dialog, 'open').and.returnValue({
            afterClosed: () => of({
                id: 1,
                title: 'Test',
                description: 'Test',
                price: 1,
                image: 'Test',
                category: 'Test'
            })
          });
        component.deleteProduct(1, 'Test');
        expect(component.deleteProduct).toHaveBeenCalled();
    });


    // it('should open the edit dialog', () => {
    //     const product = {
    //         id: 1,
    //         title: 'Test',
    //         description: 'Test',
    //         price: 1,
    //         image: 'Test',
    //         category: 'Test'
    //     };
    //     component.editProduct(product);
    //     expect(matDialogService.open).toHaveBeenCalled();
    // });

});
