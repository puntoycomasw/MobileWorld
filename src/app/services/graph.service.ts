import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ProductInterface } from '../shared/models/product'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { DataApiService } from '../services/data-api.service';
@Injectable({
  providedIn: 'root'
})
export class GraphService {
  public products = [];
  public retornar = [];
  constructor(private dataApi: DataApiService) {
    this.dataApi.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }
  getProducto(arreglo: any) {
   // console.log(this.products[0]);
    this.retornar = arreglo;
    return this.retornar;
  }
  getBuscados() {
    return this.retornar;
  }
}
