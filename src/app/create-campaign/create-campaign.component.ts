import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Campaign} from '../model/campaign';
import {CampaignService} from 'src/app/shared/campain.service'
import { finalize } from 'rxjs';
import { imageURL } from '../model/image-url';
import { FileService } from '../shared/image-upload.service';


@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  
  selectedFiles !: FileList;
  currentFileUpload !: imageURL;
  percentage: number = 0;

  listOfFiles : imageURL[] = [];
  
  campaignObject : Campaign = {
    id : '',
    dateCreated : '',
    title: '',
    description: '',
    goal: 0,
    days: 0,
    amountRaised : 0,
    imageURL: ''
  }
  title : string = '';
  description : string = '';
  goal : number = 0;
  days : number = 0;
  url : string = '';


  constructor(private fileService: FileService, private fireStorage: AngularFireStorage, private campaignService : CampaignService) { }

  ngOnInit(): void {
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.goal = 0;
    this.days = 0;
    this.url = '';
  }

  addCampaign() {
    if (this.title == '' || this.description == '' || this.goal == 0 || this.days == 0) {
      alert('Fill all input fields');
      return;
    }

    this.currentFileUpload =  new imageURL(this.selectedFiles[0]);
    const path = 'Uploads/'+this.currentFileUpload.imageFile.name;

    const storageRef = this.fireStorage.ref(path);

    storageRef.getDownloadURL().subscribe(downloadLink => {
      this.campaignObject.title = this.title;
      this.campaignObject.description = this.description;
      this.campaignObject.goal = this.goal;
      this.campaignObject.days = this.days;
      this.campaignObject.imageURL = downloadLink;
      this.campaignService.addCampaign(this.campaignObject);
    })
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFile() {  
    this.currentFileUpload =  new imageURL(this.selectedFiles[0]);
    const path = 'Uploads/'+this.currentFileUpload.imageFile.name;

    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask.snapshotChanges().pipe(finalize( () => {
       storageRef.getDownloadURL().subscribe(downloadLink => {
         this.currentFileUpload.url = downloadLink;
         this.fileService.saveMetaDataOfFile(this.currentFileUpload);
       })
       this.ngOnInit();
    })
    ).subscribe( (res : any) => {
       this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
    }, err => {
       console.log('Error occured');
    });
  }
}
