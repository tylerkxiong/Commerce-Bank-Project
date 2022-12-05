import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Route, Router } from '@angular/router';
import { user } from 'firebase-functions/v1/auth';
import { LoginuserService } from '../loginuser.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  email! : string;
  password!: string;

  public signupForm !: FormGroup;
  constructor(private auth : AuthService) { }


  
  ngOnInit(): void {
    this.auth.updateUserData(User);
  }

  login() {

    console.log(this.email)
    console.log(this.password)


    if(this.email == '') {
      alert('please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password);
    
    this.email = '';
    this.password = '';
    
  }
  

}
