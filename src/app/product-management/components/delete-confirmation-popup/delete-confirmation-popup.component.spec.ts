import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationPopupComponent } from './delete-confirmation-popup.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs';

describe('DeleteConfirmationPopupComponent', () => {
    let component: DeleteConfirmationPopupComponent;
    let fixture: ComponentFixture<DeleteConfirmationPopupComponent>;
    let productService: ProductsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DeleteConfirmationPopupComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
            ]
        });
        fixture = TestBed.createComponent(DeleteConfirmationPopupComponent);
        component = fixture.componentInstance;
        productService = TestBed.inject(ProductsService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call deleteProduct method', () => {
        spyOn(component, 'deleteProduct').and.callThrough();
        spyOn<any>(productService, 'deleteProduct').and.returnValue(of({}));
        component.data = { id: 1, title: 'test' };
        let button = fixture.debugElement.nativeElement.querySelector('.delete-btn');
        button.click();
        expect(component.deleteProduct).toHaveBeenCalledWith(1);
    });
});
