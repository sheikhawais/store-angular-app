import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductManagementComponent } from './product-management.component';
import { HeaderComponent } from '../shared/components/app-header/header.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsService } from './services/products.service';
import { DeleteConfirmationPopupComponent } from './components/delete-confirmation-popup/delete-confirmation-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { ProductShopComponent } from './components/product-shop/product-shop.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StarRatingComponent } from '../shared/components/star-rating/star-rating.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        ProductManagementComponent,
        ProductsListComponent,
        AddEditProductComponent,
        DeleteConfirmationPopupComponent,
        ProductDetailsComponent,
        ProductShopComponent,
    ],
    imports: [
        CommonModule,
        ProductManagementRoutingModule,
        HeaderComponent,
        MatDialogModule,
        MatTooltipModule,
        StarRatingComponent,
        MatChipsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        SharedModule
    ],
    providers: [
        ProductsService
    ]
})
export class ProductManagementModule { }
