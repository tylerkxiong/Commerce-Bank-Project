import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Campaign } from '../model/campaign';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common'
import { stringLength } from '@firebase/util';


@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private fireStore : AngularFirestore, private router : Router) { 
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  }
  today= new Date();
  jstoday = '';
  

  addCampaign(campaign : Campaign){
    campaign.id = this.fireStore.createId();
    let now = new Date();
    // NEEDS WORK
    campaign.dateCreated = this.jstoday;
    this.router.navigate(['\homepage']);
    return this.fireStore.collection('/Campaigns').add(campaign);
  }

  getAllCampaigns() {
    return this.fireStore.collection('/Campaigns').snapshotChanges();
  }

  getCampaignById(id:string) {
    return this.fireStore.collection('/Campaigns').doc(id).get();
  }

  updateCampaignById(id:string) {
    this.fireStore.collection('/Campaigns').doc(id).update;
  }

  deleteCampaignById(campaign: Campaign) {
    return this.fireStore.collection('/Campaigns').doc(campaign.id).delete();
  }

  updateCampaignByAmount(id:string){
    return this.fireStore.collection('/Campaigns').doc(id).update('amountRaised');
  }

  getOrderById(id:string){
    return this.fireStore.collection('/orders').doc(id).get();
  }
}
