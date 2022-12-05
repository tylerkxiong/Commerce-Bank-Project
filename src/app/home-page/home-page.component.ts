import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AngularFirestore ,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Campaign } from '../model/campaign';
import { CampaignService } from '../shared/campain.service';
import { User } from '../user';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

userRoles: Array<string>;

  constructor(private campaign : CampaignService, private afs: AngularFirestore, public auth: AuthService) { 

    
  }
user:User;
  ngOnInit(): void {
    this.getAllCampaigns();
    this.auth.user$.subscribe(user => this.user = user);
  }

  admin(){
    if(this.auth.adminCheck(this.user))
    {
      console.log('admin!');
    }
  }

  login(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
  }
  

  campaignsList: Campaign [] = [];

  getAllCampaigns() {
    this.campaign.getAllCampaigns().subscribe(res => {

      this.campaignsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching campaigns data');   
    })

  }

  

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i button-left">&#11166;</i>', '<i button-right">&#11164;</i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      500: {
        items: 3
      },
      200: {
        items: 3
      }
    },
    nav: true
  }
}
