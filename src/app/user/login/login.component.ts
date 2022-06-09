import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = "";
  password:string = "";
  invalidLogin:boolean = false;
  errorMessage:string = "";
  constructor(private auth:AuthService, private data:DataService, private router: Router) { }
  ngOnInit(): void {
  }

  login(){
    const payload = {
      email:this.email,
      password:this.password
    }
    this.data.Login(payload).subscribe({
      next: (response) => {
        const token = (<any>response).token;
        const refreshToken = (<any>response).refreshToken;
        this.auth.setToken("accessToken", token);
        this.auth.setToken("refreshToken", refreshToken);
        this.invalidLogin = false;
        this.router.navigate(["/UserHome"]);
        this.errorMessage = (<any>response).error;  
      },
      error: (error) => {
        this.errorMessage = error.error+" "+error.statusText;
        this.invalidLogin = true;
      },
      complete: () => console.log('Login complete')
    });
  }
}
