import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Campaign } from '../model/campaign';
import { CampaignService } from '../shared/campain.service';
import { NgForm } from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})


export class ProjectsComponent implements OnInit {

  campaigns: Campaign [];
  campObj: Campaign = {
    title:'',
    goal:-1,
    days:-1,
    description:'',
    imageURL: '',

  }
  id;
  title:string = '';
    goal: number =-1;
    days:number =-1;
    description:string = '';
    imageURL: string = '';
  constructor(private campaign : CampaignService, private router : Router, private route: ActivatedRoute, public auth: AuthService) { }

  ngOnInit(): void {
    this.getAllCampaigns();
    this.id = this.route.snapshot.paramMap['id'];
    this.title= this.campObj.title;
    this.goal = this.campObj.goal;
    this.days = this.campObj.days;
    this.description= this.campObj.description;
    this.imageURL= this.campObj.imageURL;


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

  
  updateCampaign(){
      
  }

  submitEdit(){
    let camp = {
      title: this.title,
      goal: this.goal,
      days: this.days,
      description: this.description,
      imageURL: this.imageURL,
    
    }

    this.campaign.updateCampaignById(this.campObj.id);
    this.router.navigate(['/projects'])
  }

  deleteCampaign(campaign:Campaign){
    if (window.confirm('Are you sure you want to delete ' + campaign.title +  ' ?')) {
      this.campaign.deleteCampaignById(campaign);
    }
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
