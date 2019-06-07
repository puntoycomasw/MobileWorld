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

  ngOnInit() {
    this.dataApi.getAllProducts().subscribe(products => {

      this.products = products;

    });

    this.auth.isAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.auth.getAllUsers().subscribe(users => {
          this.users = users;
          this.users.forEach(user => {
            if (user.id == this.uid) {
              this.user = user;
              this.carrito = user.car
            }
          });
        })
      }
    });
  }
  carrito_producto(phone: string) {
    localStorage.setItem("carrito", phone);
    var x = localStorage.getItem("carrito");
    this.carrito.push(x);
    console.log(this.carrito);

    this.auth.updateUser(this.user, this.carrito);
  }

}