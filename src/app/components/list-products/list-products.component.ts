import { ProductInterface } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';

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
    this.dataApi.selectedProduct = Object.assign({}, product);
  }
}
