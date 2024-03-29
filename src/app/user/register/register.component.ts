import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataService } from 'src/app/Service/data.service';
import { IUserRegister } from "src/app/IUserRegister";
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  FirstName:string = "";
  LastName:string = "";
  Balance:number = 0;
  Email:string = "";
  Password:string = "";
  ConfirmPassword:string = "";
  IsSucceeded:boolean = false;
  userRegisterForm=new FormGroup({
    firstNameControl:new FormControl('',[Validators.required]),
    lastNameControl:new FormControl('',[Validators.required]),
    balanceControl:new FormControl('',[Validators.required]),
    emailControl:new FormControl('',[Validators.required]),
    passControl:new FormControl('',[Validators.required]),
    cPassControl:new FormControl('',[Validators.required])
  })
  userRegister(){
    console.warn(this.userRegisterForm.value);
    
  }
  get firstNameControl(){
    return this.userRegisterForm.get('firstNameControl');
  }
  get lastNameControl(){
    return this.userRegisterForm.get('lastNameControl');
  }
  get balanceControl(){
    return this.userRegisterForm.get('balanceControl');
  }  
  get emailControl(){
    return this.userRegisterForm.get('emailControl');
  }
  get passControl(){
    return this.userRegisterForm.get('passControl');
  }
  get cPassControl(){
    return this.userRegisterForm.get('cPassControl');
  }

  constructor(private dataService: DataService, private router:Router) { 
    
  }

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
      role:"User"
    };

  this.dataService.CreateUser(user).subscribe(u=> {
    this.IsSucceeded = true;
    alert("Registration Successfull.");
    this.router.navigate(["/Login"]);
  });
  }
}




