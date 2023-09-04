import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-add-edit-product',
    templateUrl: './add-edit-product.component.html',
    styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent {

    productsForm: FormGroup;
    
    constructor(
        public dialogRef: MatDialogRef<AddEditProductComponent>,
        @Inject(MAT_DIALOG_DATA) public product: Product,
        private _productsService: ProductsService,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.productsForm = this.formBuilder.group({
            title: [this.product.title, Validators.required],
            description: [this.product.description, Validators.required],
            price: [this.product.price, Validators.required],
            image: [this.product.image, Validators.required],
            category: [this.product.category, Validators.required]
        });
    }

    onSubmit() {
        if ( this.productsForm.invalid ) return;
        const product = this.productsForm.value;
        if ( this.product.id ) {
            product.id = this.product.id;
            this.updateProduct(product);
        } else {
            product.rating = {rate: 0 , count: 0};
            this.addProduct(product);
        }
    }

    updateProduct(product: Product) {
        this._productsService.updateProduct(product)
        .subscribe({
            next: (response: any) => {
                this.dialogRef.close(response);
            },
            error: (error: HttpErrorResponse) => {
                console.error(error)
            }
        });
    }

    addProduct(product: Product) {
        this._productsService.addProduct(product)
        .subscribe({
            next: (response: any) => {
                response.rating = {rate: 0 , count: 0};
                this.dialogRef.close(response);
            },
            error: (error: HttpErrorResponse) => {
                console.error(error)
            }
        });
    }

}
