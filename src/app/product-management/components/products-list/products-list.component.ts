import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../models/products.model';
import { DeleteConfirmationPopupComponent } from '../delete-confirmation-popup/delete-confirmation-popup.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {

    displayedColumns: string[] = ['id', 'title', 'price', 'rating', 'category', 'actions'];
    loading: boolean = false;
    dataSource = new MatTableDataSource<Product>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _productsService: ProductsService,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.loading = true;
        this._productsService.getProducts()
        .subscribe({
            next: (response: any) => {
                this.dataSource = new MatTableDataSource<Product>(response);
                this.dataSource.paginator = this.paginator;
            },
            error: (error: HttpErrorResponse) => {
                console.error(error)
            },
            complete: () => {
                this.loading = false;
                console.info('complete') 
            }
        })
    }

    showProduct(product: Product) {
        this.dialog.open(ProductDetailsComponent, {
            width: '750px',
            data: product,
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '500ms'
        });
    }

    addProduct() {
        this.dialog.open(AddEditProductComponent, {
            width: '750px',
            data: {
                title: '',
                description: '',
                price: 0,
                image: '',
                category: '',
                rating: { rate: 0, count: 0 }
            },
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '500ms'
        })
        .afterClosed()
        .subscribe((product: Product) => {
            if (product) {
                const data = this.dataSource.data;
                data.unshift(product);
                this.dataSource.data = data;
                this._snackBar.open('Product Added Successfully!', 'Got it', {
                    duration: 3000
                });
            }
        });
    }

    editProduct(product: Product) {
        this.dialog.open(AddEditProductComponent, {
            width: '750px',
            data: product,
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '500ms'
        })
        .afterClosed()
        .subscribe((product: Product) => {
            if (product) {
                this._snackBar.open('Product Updated Successfully!', 'Got it', {
                    duration: 3000
                });
                this.updateProduct(product); // refresh the product list
            }
        });
    }

    updateProduct(product: Product) {
        const data = this.dataSource.data;
        const index = data.findIndex((p: Product) => p.id === product.id);
        data[index] = {...product, rating: data[index].rating};
        this.dataSource.data = data;
    }

    deleteProduct(id: number, title: string) {
        this.dialog.open(DeleteConfirmationPopupComponent, {
            width: '400px',
            data: { id, title },
            enterAnimationDuration: '500ms',
            exitAnimationDuration: '500ms'
        })
        .afterClosed()
        .subscribe((response: Product) => {
            if (response) {
                this.loadProducts(); // refresh the product list
            }
        });
    }


}
