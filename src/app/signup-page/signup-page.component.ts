
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators}from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from '../model/user';
import { UserService } from '../shared/user.service';
import { auth } from 'firebase-admin';



@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {


  public signupForm !: FormGroup;

  User: User[] = [];
  UserObject: User = {
    first_name: '',
    email: '',
    last_name: '',
    password: '',
    
    roles: {'subscriber' : true, 'admin' : false},
    
  };
  first_name: string = '';
  last_name: string = '';
  email : string;
  password: string;
  
  roles: boolean;
  constructor(private auth : AuthService, private UserData : UserService) { }


  
  ngOnInit(): void {
  }


  resetForm() {
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.password = '';
  }

  addUsers() {
    if (this.first_name == '' || this.last_name == '' || this.password == '' || this.email == '') {
      alert('Fill all input fields');
      return;
    }

    this.UserObject.email = this.email;
    this.UserObject.first_name = this.first_name;
    this.UserObject.last_name = this.last_name;
    this.UserObject.password = this.password; 
    
    this.UserObject.roles = {'subscriber' : true};
    this.UserData.addUser(this.UserObject);
    this.resetForm();

  }

  register() {
    if(this.email == '') {
      alert('please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.register(this.email,this.password);
    this.addUsers();
  }
}
