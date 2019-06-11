import { GraphService } from './../../services/graph.service';
import { Observable } from 'rxjs/internal/Observable';
import { DataApiService } from '../../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { ProductInterface } from '../../shared/models/product';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'iso-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    public router: Router, private afsAuth: AngularFireAuth,
    private dataApi: DataApiService,
    private graph: GraphService
  ) { }
  public isLogged: boolean = false;
  public logueado = null;
  public products = [];
  public colector = [];

  ngOnInit() {
    this.dataApi.getAllProducts().subscribe(products => {
      this.products = products;
    });
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }
  imprimir() {
    var unit = (<HTMLInputElement>document.getElementById("entrada")).value;
    //console.log(unit);
    for (let i = 0; i < this.products.length; i++) {
      var name = this.products[i].name;
      var name = name.toLowerCase();
      var arreglo = name.split(" ");
      for (let j = 0; j < arreglo.length; j++) {
        if (unit == arreglo[j]) {
          this.colector.push(this.products[i]);
        }
      }
    }
    if (this.colector.length > 0) {
      this.graph.getProducto(this.colector);
      this.colector = [];
      this.router.navigate(['search']);
    }
  }

  onLogout() {
    localStorage.clear();
    this.afsAuth.auth.signOut();
  }
  shopC() {
    this.authService.isAuth().subscribe(auth => {
      if (auth)
        this.router.navigate(['user/shoppingCart']);
    });
  }
  home() {
    this.router.navigate(['']);
  }
  lisP() {
    this.router.navigate(['user/list-products']);
  }
  shop() {
    this.router.navigate(['user/shopping']);
  }
  profile() {
    this.router.navigate(['user/profile']);
  }
}