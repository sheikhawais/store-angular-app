import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';

interface DeleteProduct {
    id: number;
    title: string;
}

@Component({
  selector: 'app-delete-confirmation-popup',
  templateUrl: './delete-confirmation-popup.component.html',
  styleUrls: ['./delete-confirmation-popup.component.scss']
})
export class DeleteConfirmationPopupComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteConfirmationPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DeleteProduct,
        private _productsService: ProductsService
    ) { }

    deleteProduct(id: number) {
        this._productsService.deleteProduct(id)
        .subscribe({
            next: <Product>(response: Product) => {
                alert('Product deleted successfully');
                this.dialogRef.close(response);
            }
        })
    }
    
}
