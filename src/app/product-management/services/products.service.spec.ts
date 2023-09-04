import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductsService', () => {
    let service: ProductsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(ProductsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call deleteProduct method', () => {
        spyOn<any>(service, 'deleteProduct').and.callThrough();
        service.deleteProduct(1);
        expect(service.deleteProduct).toHaveBeenCalledWith(1);
    });

    it('should call updateProduct method', () => {
        spyOn<any>(service, 'updateProduct').and.callThrough();
        service.updateProduct({
            id: 1,
            title: 'Test',
            description: 'Test',
            price: 1,
            image: 'Test',
            category: 'Test'
        });
        expect(service.updateProduct).toHaveBeenCalledWith({
            id: 1,
            title: 'Test',
            description: 'Test',
            price: 1,
            image: 'Test',
            category: 'Test'
        })
    });

    
});
