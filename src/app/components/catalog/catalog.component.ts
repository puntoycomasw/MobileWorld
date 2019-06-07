import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';
import { ProductInterface } from '../../shared/models/product'
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  constructor(private dataApi: DataApiService, public auth: AuthService) { }
  public products = [];
  public users = [];
  public uid = "";
  public user;
  public carrito = [];
  public history = [];
  public userUid: string = null;
  ngOnInit() {
    this.dataApi.getAllProducts().subscribe(products => {
      this.products = products;
    });
    this.auth.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.auth.getAllUsers().subscribe(users => {
          this.users = users;
          this.users.forEach(user => {
            if (user.id == this.userUid) {
              this.user = user;
              this.carrito = user.car;
              this.history = user.history;
            }
          });
        })
      }
    });
  }
  addToCar(idPhone: string) {
    localStorage.setItem("Product", idPhone);
    var x = localStorage.getItem("Product");
    this.carrito.push(x);
    this.auth.addToCar(this.user, this.carrito);
  }
  buyProduct(idPhone: string) {
    localStorage.setItem("Product", idPhone);
    var x = localStorage.getItem("Product");
    this.history.push(x);
    this.auth.buyProduct(this.user, this.history);
  }
  onPreUpdateProduct(product: ProductInterface) {
    this.dataApi.selectedProduct = Object.assign({}, product);
  }

}