import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { UserInterface } from '../shared/models/user'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database/database';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public productsCollection: AngularFirestoreCollection<UserInterface>;
  public users: Observable<UserInterface[]>;
  public userDoc: AngularFirestoreDocument<UserInterface>;
  name: string;
  constructor(public afsAuth: AngularFireAuth, public afs: AngularFirestore, public db: AngularFireDatabase) {
  }
  getAllUsers() {
    this.productsCollection = this.afs.collection<UserInterface>('users');
    return this.users = this.productsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as UserInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
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
      car: user.car = [],
      history: user.history = []
    }
    return userRef.set(data, { merge: true })
  }

  addToCar(user: UserInterface, product: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
    const data: UserInterface = {
      car: user.car = product
    }
    return userRef.set(data, { merge: true })
  }
  buyProduct(user: UserInterface, product: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
    const data: UserInterface = {
      history: user.history = product
    }
    return userRef.set(data, { merge: true })
  }
}
