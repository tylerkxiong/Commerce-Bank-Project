
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user'
import { UserService } from '../shared/user.service'
import { AuthService } from '../shared/auth.service';
import { of } from 'rxjs';

import{FormsModule,FormBuilder,ReactiveFormsModule, FormGroup}from "@angular/forms";


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  
  
 public signup !: FormGroup;
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
    this.getAllUsers();
  }

  

  getAllUsers() {

    this.UserData.getAllUsers().subscribe(res => {

      this.User = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching user data');
    })

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


  updateUser() {

  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.first_name + ' ' + user.last_name + ' ?')) {
      this.UserData.deleteUser(user);
    }
  }

}
