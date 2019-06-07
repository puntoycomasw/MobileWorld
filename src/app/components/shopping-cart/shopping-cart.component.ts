import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public auth: AuthService, private dataApi: DataApiService) { }
  public products = [];
  public uid = "";
  public carV = [];
  public users = [];
  public user;
  public carrito = [];

  ngOnInit() {
    this.auth.isAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.auth.getAllUsers().subscribe(users => {
          this.users = users;
          this.users.forEach(user => {
            if (user.id == this.uid) {
              this.user = user;
              this.carrito = user.car;
              this.dataApi.getAllProducts().subscribe(products => {
                this.products = products;
                for (let i = 0; i < this.carrito.length; i++) {
                  for (let j = 0; j < this.products.length; j++) {
                    if (this.carrito[i] == this.products[j].id) {
                      this.carV.push(this.products[j]);
                    }
                  }
                }
              });
            }
          });
        })
      }
    })
  }
}
