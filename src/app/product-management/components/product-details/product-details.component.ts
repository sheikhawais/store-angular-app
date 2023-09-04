import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
    constructor(
        public dialogRef: MatDialogRef<ProductDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public product: Product
    ) { }
}
