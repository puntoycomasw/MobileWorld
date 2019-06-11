import { GraphService } from './../../services/graph.service';
import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private dataApi: DataApiService, public auth: AuthService, public graph: GraphService) { }

  public products = [];
  public users = [];
  public uid = "";
  public user;
  public carrito = [];
  public history = [];
  public logueado = null;
  public userUid: string = null;
  ngOnInit() {
    this.logueado = localStorage.getItem("logueado");
    this.products = this.graph.getBuscados();
    //console.log(this.products.length);
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

}
