import { Component, OnInit } from '@angular/core';
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
