import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import * as firebase from 'firebase/app';
import { AngularFirestore ,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  constructor(private afs: AngularFirestore, private fireauth : AngularFireAuth, private router : Router) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.fireauth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`Users/${user.uid}`).valueChanges()
      } else {
        return of(null)
      }
    }))
   }
  
  
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
        this.router.navigate(['/homepage']);
    }, err => {
        alert(err.message);
        this.router.navigate(['/loginpage']);
    })
  }
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( () => {
      alert('Registration Successful');
      this.router.navigate(['/loginpage']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/signup']);
    })
  }

  //sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err =>{
      alert(err.message)
    })
  }

  updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {'subscriber': true},
      password: user.password,
    }
    return userRef.set(data, { merge: true })
  }


  adminCheck(user: User): boolean{
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }
  checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  }
}
