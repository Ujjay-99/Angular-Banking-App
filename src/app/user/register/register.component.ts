import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataService } from 'src/app/Service/data.service';
import { IUserRegister } from "src/app/IUserRegister";


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

  constructor(private dataService: DataService) { 
    
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

  this.dataService.CreateUser(user).subscribe(u=> this.IsSucceeded = true);
  }
}
  // onFormSubmit(form: NgForm)    
  // { 
  //   console.log("hit register");
       
  //   const user = this.registerForm.value;    
  //   this.registerNew(user);    
  // } 
  // registerNew(register:IUserRegister)    
  // {    
  // this.dataService.CreateUser1(register).subscribe(    
  //   ()=>    
  //   {    
  //     this.data = true;    
  //     this.massage = 'Data saved Successfully';    
  //     this.registerForm.reset();    
  //   });    
  // } 
//   public registerUser = (registerFormValue: any) => {
//     const formValues = { ...registerFormValue };
    




