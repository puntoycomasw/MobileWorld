import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';
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
  ngOnInit() {
    this.dataApi.getAllProducts().subscribe(products => {

      this.products = products;
    });


    this.auth.isAuth().subscribe(auth => {
      if (auth)
        this.uid = auth.uid;
      console.log(this.uid);
    });

    this.auth.getAllUsers().subscribe(users => {
      this.users = users;
      this.users.forEach(element => {
        if (element.id == this.uid)
          this.auth.updateUser(element, element.id)
      });
    })
  }
  carrito_producto(id: string) {
    localStorage.setItem("carrito", id);
  }


}