import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShopComponent } from './product-shop.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { ProductsService } from '../../services/products.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('ProductShopComponent', () => {
    let component: ProductShopComponent;
    let fixture: ComponentFixture<ProductShopComponent>;
    let productService: ProductsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProductShopComponent],
            imports: [HttpClientTestingModule, LoaderComponent]
        });
        fixture = TestBed.createComponent(ProductShopComponent);
        component = fixture.componentInstance;
        productService = TestBed.inject(ProductsService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load categories', () => {
        spyOn(productService, 'getCategories').and.returnValue(of([]));
        component.ngOnInit();
        expect(productService.getCategories).toHaveBeenCalled();
    });

    it('should handle error when loading categories', () => {
        spyOn<any>(productService, 'getCategories').and.returnValue(throwError(new HttpErrorResponse({})));
        spyOn(component, 'loadCategories').and.callThrough();
        component.ngOnInit();
        expect(component.loadCategories).toHaveBeenCalled();
    });

    it('should load products', () => {
        spyOn(productService, 'getProducts').and.returnValue(of([]));
        component.ngOnInit();
        expect(productService.getProducts).toHaveBeenCalled();
    });

    it('should handle error when loading products', () => {
        spyOn<any>(productService, 'getProducts').and.returnValue(throwError(new HttpErrorResponse({})));
        spyOn<any>(component, 'loadProducts').and.callThrough();
        component.ngOnInit();
        expect(component.loadProducts).toHaveBeenCalled();
    });

    it('should filter products', () => {
        component.filterProducts('all');
        expect(component.filteredProducts).toEqual(component.products);
        component.products = [{
            id: 1,
            title: 'Test',
            description: 'Test',
            price: 1,
            image: 'Test',
            category: 'Test'
        }, {
            id: 2,
            title: 'Test 2',
            description: 'Test',
            price: 1,
            image: 'Test',
            category: 'Not Test'
        }]
        component.filterProducts('Test');
        expect(component.filteredProducts).toEqual([component.products[0]]);
    });




});
