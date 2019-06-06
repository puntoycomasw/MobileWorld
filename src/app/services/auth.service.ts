import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { ProductInterface } from '../shared/models/product'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../shared/models/user';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  name: string;
  constructor(public afsAuth: AngularFireAuth, public afs: AngularFirestore) {

  }
  public product: Observable<ProductInterface>;
  registerUser(email: string, name: string, pass: string) {
    this.name = name;
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user)
        }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  public updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,

      email: user.email,
      name: user.name = this.name,
      car: user.car = {
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
      }


    }
    return userRef.set(data, { merge: true })
  }

  /*  isUserAdmin(userUid) {
     return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
   } */
}
