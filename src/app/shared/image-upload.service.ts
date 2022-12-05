import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { imageURL } from '../model/image-url';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fireStore : AngularFirestore, private fireStorage : AngularFireStorage) { }

  saveMetaDataOfFile(fileObj : imageURL) {
    const fileMeta = {
      url : fileObj.url,
    }
    this.fireStore.collection('/Upload').add(fileMeta);
  }

}