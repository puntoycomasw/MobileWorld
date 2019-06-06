import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../shared/models/user';
import { AngularFireDatabase } from '@angular/fire/database/database';
@Injectable({
  providedIn: 'root'
})
/* export class Item {
  body: string;
} */
export class AuthService {
 /*  items: Observable<Item[]> = null; */
  userId: string;

  name: string;
  constructor(public afsAuth: AngularFireAuth, public afs: AngularFirestore, public db: AngularFireDatabase) {
   /*  this.afsAuth.authState.subscribe(user => {
      if (user)
        this.userId = user.uid;
        console.log(this.userId);
        console.log(user.uid);
    }) */
  }
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
      car: user.car = {},
    }
    return userRef.set(data, { merge: true })
  }
  /* public shopCar(id: string, user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,

      email: user.email,
      name: user.name = this.name,
      car: user.car = {},
    }
    return userRef.set(data, { merge: true })
  } */
  /* getItemsList(): Observable<Item[]>{
    if (!this.userId)return;
    this.items=this.db.list(`items/${this.userId}`);
    return this.items;
  }
  createItem(item:Item){
    this.items.push(item);
  } */
}
