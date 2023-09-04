import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../models/products.model';
import { MatDialog } from '@angular/material/dialog';
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-product-shop',
    templateUrl: './product-shop.component.html',
    styleUrls: ['./product-shop.component.scss'],
    animations: [
        trigger('scaleIn', [
            transition(':enter', [
                style({ transform: 'scale(0.9)' }), // Initial scale value
                animate('400ms ease-in', style({ transform: 'scale(1)' })) // Final scale value and animation duration
            ])
        ])
    ],
})
export class ProductShopComponent {

    loading: boolean = false;
    products: Product[] = [];
    filteredProducts: Product[] = [];
    categories: string[] = [];

    constructor(
        private _productsService: ProductsService
    ) { }

    ngOnInit() {
        this.loadCategories();
        this.loadProducts();
    }

    loadCategories() {
        this._productsService.getCategories()
            .subscribe({
                next: (response: any) => {
                    this.categories = response;
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error)
                }
            });
    }

    filterProducts(category: string) {
        if (category === 'all') {
            this.filteredProducts = this.products;
        } else {
            this.filteredProducts = this.products.filter(product => product.category === category);
        }
    }

    loadProducts() {
        this.loading = true;
        this._productsService.getProducts()
            .subscribe({
                next: (response: any) => {
                    this.products = this.filteredProducts = response;
                },
                error: (error: HttpErrorResponse) => {
                    console.error(error)
                },
                complete: () => {
                    this.loading = false;
                }
            });
    }
}
