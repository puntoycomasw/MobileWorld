import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }
  user: UserInterface = {
    name: '',
    email: ''
  };
  public users = [];
  public uid = "";

  ngOnInit() {
    this.auth.isAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.auth.getAllUsers().subscribe(users => {
          this.users = users;
          this.users.forEach(element => {
            if (element.id == this.uid) {
              this.user.name = element.name;
              this.user.email = element.email;
            }

          });
        })
      }
    });

  }
}
