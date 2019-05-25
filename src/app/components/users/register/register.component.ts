import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(public router: Router, public authService: AuthService, public storage: AngularFireStorage) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;

  public email: string = '';
  public password: string = '';

  ngOnInit() {
  }

  onAddUser() {
    this.authService.registerUser(this.email, this.password).then((res) => {
      this.onLoginRedirect();
    }).catch(/* err => console.log('err', err.message) */res=> this.prueba());
  }
  prueba(){
    document.getElementById("error").innerHTML = "The email has already been registered, enter a new one";

  }
  onLoginRedirect(): void {
    this.router.navigate(['']);
  }
}
