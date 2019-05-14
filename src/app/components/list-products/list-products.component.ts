import { ProductInterface } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../shared/models/user';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  constructor(public dataApi: DataApiService, public authService: AuthService) { }
  public products: ProductInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListProducts();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          // this.isAdmin = true;
        })
      }
    })
  }
  getListProducts() {
    this.dataApi.getAllProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  onDeleteProduct(idProduct: string): void {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteProduct(idProduct);
    }
  }

  onPreUpdateProduct(product: ProductInterface) {
    console.log('PRODUCT', product);
    this.dataApi.selectedProduct = Object.assign({}, product);
  }
}
