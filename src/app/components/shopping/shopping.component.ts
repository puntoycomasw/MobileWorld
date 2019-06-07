import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  constructor(public auth: AuthService, private dataApi: DataApiService) { }
  public products = [];
  public uid = "";
  public historyV = [];
  public users = [];
  public user;
  public history = [];

  ngOnInit() {
    this.auth.isAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.auth.getAllUsers().subscribe(users => {
          this.users = users;
          this.users.forEach(user => {
            if (user.id == this.uid) {
              this.user = user;
              this.history = user.history;
              this.dataApi.getAllProducts().subscribe(products => {
                this.products = products;
                for (let i = 0; i < this.history.length; i++) {
                  for (let j = 0; j < this.products.length; j++) {
                    if (this.history[i] == this.products[j].id) {
                      this.historyV.push(this.products[j]);
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
