import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: any;
  
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }

  getUserState() {
    return this.afAuth.authState;
  }
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(['/home']);
        }
      })
  }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
        });
        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/home']);
          });
      })
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName
    })
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
  getUserInfo(): firebase.User {
    return this.afAuth.auth.currentUser;
  }
  updatePicture(photoURL: string) {
    const user = this.getUserInfo();
    return this.db.doc(`users/${user.uid}`)
    .update({ photoURL })
    .then(() => user.updateProfile({  photoURL }));
  }
  updateName(displayName: string) {
    firebase.auth().currentUser.updateProfile({
      displayName: displayName
    })
  }
}
