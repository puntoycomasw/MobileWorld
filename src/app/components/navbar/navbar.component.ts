import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'iso-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, private afsAuth: AngularFireAuth) { }
  public isLogged: boolean = false;
  public logueado = null;
  ngOnInit() {
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
    console.log(unit);
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