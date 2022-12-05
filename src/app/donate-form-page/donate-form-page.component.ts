import { Component, NgModule, OnInit } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CampaignService } from '../shared/campain.service';
import { Campaign } from '../model/campaign';
import { ProjectsComponent } from '../projects/projects.component';
import {MatCardModule} from '@angular/material/card';
declare var Stripe:any;

var campaign:any;

@Component({
  selector: 'app-donate-form-page',
  templateUrl: './donate-form-page.component.html',
  styleUrls: ['./donate-form-page.component.css']
})

export class DonateFormPageComponent implements OnInit {

  //                        all items in the Cloud Firestore "clothes" collection
  
  stripeStatus: string;                           // {'', 'cancel', 'success'}
  campaign: Campaign | undefined;
  
  constructor(
    private service:CampaignService,
    private firestore: AngularFirestore,
    private afFun: AngularFireFunctions,
    private activeRoute: ActivatedRoute,
    private router: Router) {
    afFun.useEmulator("localhost", 5001);
    this.campaign = null;
    this.stripeStatus = '';
}


camp:any
campid:any
ngOnInit(): void {
  let campaignId = this.activeRoute.snapshot.paramMap.get('id');
  console.warn(campaignId);
  campaignId && this.service.getCampaignById(campaignId).subscribe((result) =>{
    console.warn(result.data());
    this.campaign = result.data();
  })
  


  // this.clothes = this.firestore.collection('clothes').valueChanges();                                      // get all items
  //this.Campaigns = this.firestore.collection('Campaigns', ref => ref.where('name', '!=', null)).valueChanges();   // get certain items
  

 /*this.route.params.subscribe(data => {
    this.campaignId = data.id;
 })
    this.getCampaignById(this.id);
    this.campid = params.get('id');
 //})*/
  
  this.stripeStatus = this.getStripeStatus();                                         // read URL for "/home?action="
}
  
getCampaignById(id:string){
  this.service.getCampaignById(id)
  
}

updateAmountRaised(){
  
}

getStripeStatus(): string {
  let action = this.activeRoute.snapshot.queryParamMap.get('action');              // ex: '/home?action=success'
  console.log('action = ', action);
  if (action && action == 'cancel' || action == 'success')
      return action;
  return '';
}



checkoutFirebase(productId: string,): void {
  console.log('checking out with item id: ' + productId);

  var stripe = Stripe(environment.stripe.key);

  this.afFun.httpsCallable("stripeCheckout")({ id: productId })
      .subscribe(result => {
          console.log({ result });

          stripe.redirectToCheckout({
              sessionId: result,
          }).then(function (result: { error: { message: any; }; }) {
              console.log("its me",result.error.message);
          });
      }, err => {
        alert("couldn't load");
      });
}


reloadHome(): void {
  this.router.navigate(['/projects'])
      .then(() => {
          window.location.reload();
      });
}

}
