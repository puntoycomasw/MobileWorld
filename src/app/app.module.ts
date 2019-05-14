import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './components/catalog/catalog.component';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { FormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { Page404Component } from './components/page404/page404.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ModalComponent } from './components/modal/modal.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { materialize } from 'rxjs/operators';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CatalogComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    Page404Component,
    FooterComponent,
    ListProductsComponent,
    ModalComponent,
    DetailsProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
