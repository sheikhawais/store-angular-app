import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(
        private http: HttpClient
    ) { }

    getCategories() {
        return this.http.get('https://fakestoreapi.com/products/categories');
    }

    getProducts() {
        return this.http.get('https://fakestoreapi.com/products');
    }
    
    // getProductsByCategory(category: string) {
    //     return this.http.get(`https://fakestoreapi.com/products/category/${category}`);
    // }

    // getProductById(id: number) {
    //     return this.http.get(`https://fakestoreapi.com/products/${id}`);
    // }
    
    addProduct(product: Product) {
        return this.http.post('https://fakestoreapi.com/products', product);
    }

    updateProduct(product: Product) {
        return this.http.put(`https://fakestoreapi.com/products/${product.id}`, product);
    }
    
    deleteProduct(id: number) {
        return this.http.delete(`https://fakestoreapi.com/products/${id}`);
    }

}
