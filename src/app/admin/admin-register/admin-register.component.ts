import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserRegister } from 'src/app/IUserRegister';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  FirstName:string = "";
  LastName:string = "";
  Balance:number = 501;
  Email:string = "";
  Password:string = "";
  ConfirmPassword:string = "";
  IsSucceeded:boolean = false;

  adminRegisterForm=new FormGroup({
    firstNameControl:new FormControl('',[Validators.required]),
    lastNameControl:new FormControl('',[Validators.required]),
    emailControl:new FormControl('',[Validators.required]),
    passControl:new FormControl('',[Validators.required]),
    cPassControl:new FormControl('',[Validators.required])
  })
  adminRegister(){
    console.warn(this.adminRegisterForm.value);
    
  }
  get firstNameControl(){
    return this.adminRegisterForm.get('firstNameControl');
  }
  get lastNameControl(){
    return this.adminRegisterForm.get('lastNameControl');
  }
   
  get emailControl(){
    return this.adminRegisterForm.get('emailControl');
  }
  get passControl(){
    return this.adminRegisterForm.get('passControl');
  }
  get cPassControl(){
    return this.adminRegisterForm.get('cPassControl');
  }
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  register(){
    const user: IUserRegister = {
      firstName: this.FirstName,
      lastName: this.LastName,
      email: this.Email,
      balance:this.Balance,
      password: this.Password,
      confirmPassword: this.ConfirmPassword,
      role:"Admin"
    };

  this.dataService.CreateUser(user).subscribe(u=>this.IsSucceeded = true);
  }

}
