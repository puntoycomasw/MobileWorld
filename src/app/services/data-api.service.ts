import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ProductInterface } from '../shared/models/product'
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(public afs: AngularFirestore) { }
  public productsCollection: AngularFirestoreCollection<ProductInterface>;
  public products: Observable<ProductInterface[]>;
  public productDoc: AngularFirestoreDocument<ProductInterface>;
  public product: Observable<ProductInterface>;
  public selectedProduct: ProductInterface = {
    id: null
  } 

  getAllProducts() {
    this.productsCollection = this.afs.collection<ProductInterface>('products');
    return this.products = this.productsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProductInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }


  getAllProductsOffers() {
    this.productsCollection = this.afs.collection('products', ref => ref.where('offer', '==', '1'));
    return this.products = this.productsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProductInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getOneProduct(idProduct: string) {
    this.productDoc = this.afs.doc<ProductInterface>(`products/${idProduct}`);
    return this.product = this.productDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as ProductInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addProduct(product: ProductInterface): void {
    this.productsCollection.add(product);
  }
  updateProduct(product: ProductInterface): void {
    let idProduct = product.id;
    this.productDoc = this.afs.doc<ProductInterface>(`products/${idProduct}`);
    this.productDoc.update(product);
  }
  deleteProduct(idProduct: string): void {
    this.productDoc = this.afs.doc<ProductInterface>(`products/${idProduct}`);
    this.productDoc.delete();
  }
}
