import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs : AngularFirestore) { }

  getAllUsers(){
    return this.afs.collection('/Users').snapshotChanges();
  }

  addUser(user : User){
    return this.afs.collection('/Users').add(user);
  }

  updateUser(user : User){
    this.deleteUser(user);
    this.addUser(user);

  }

  deleteUser(user: User){
    this.afs.collection('/Users{uid}').doc(user.email).delete();
  }
}
