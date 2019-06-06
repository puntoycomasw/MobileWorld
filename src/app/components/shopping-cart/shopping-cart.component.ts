import { getTestBed } from '@angular/core/testing';
import { UserInterface } from './../../shared/models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public authService: AuthService) { }
  user: UserInterface = {
    name: '',
    email: '',
    car:{}
  };

  public providerId: string = 'null';
  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
       
        /* this.user.car = {
          type: "celular",
          name: "telefono",
          brand: "sony",
          model: "x1",
          image: "https://static.fnac-static.com/multimedia/Images/ES/NR/d2/15/0d/857554/1540-4.jpg",
          description: "wjdkwa",
          price: 1,
          quantity: 1,
          offer: "no",
          id: "vacio",
          userUid: "vacio"
        }; */
        console.log(this.user.car.name);
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.providerId = user.providerData[0].providerId;
      }
    })
  }

}
