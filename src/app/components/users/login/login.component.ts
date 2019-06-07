import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router, public authService: AuthService) { }
  public email: string = '';
  public password: string = '';
  public name: string = '';
  ngOnInit() {
    console.log("imprimido");
  }
 
  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }
  
  onLogout() {
    this.authService.logoutUser();
   var dwa = document.getElementById
  }
  onLoginRedirect(): void {
    this.router.navigate(['']);
  }
}