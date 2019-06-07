import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { LoginComponent } from './components/users/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { ModalComponent } from './components/modal/modal.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { NotifComponent } from './components/notif/notif.component';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'user/shopping', component: ShoppingComponent },
  { path: 'user/list-products', component: ListProductsComponent },
  { path: 'user/shoppingCart', component: ShoppingCartComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'notif', component: NotifComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
