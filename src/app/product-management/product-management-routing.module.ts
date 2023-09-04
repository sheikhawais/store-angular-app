import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductManagementComponent } from './product-management.component';
import { ProductShopComponent } from './components/product-shop/product-shop.component';
import { adminGuard } from '../guards/admin/admin.guard';

const routes: Routes = [
    {
        path: '', component: ProductManagementComponent, children: [
            { path: '', redirectTo: '/list', pathMatch: 'full' },
            { path: 'list', component: ProductsListComponent, canActivate: [adminGuard] },
            { path: 'shop', component: ProductShopComponent, canActivate: [adminGuard] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
