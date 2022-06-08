import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  email:string = "";
  password:string = "";
  invalidLogin:boolean = false;
  constructor(private auth:AuthService, private data:DataService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    const payload = {
      email:this.email,
      password:this.password
    }
    this.data.AdminLogin(payload).subscribe({
      next: (response) => {
        const token = (<any>response).token;
        const refreshToken = (<any>response).refreshToken;
        this.auth.setToken("accessToken", token);
        this.auth.setToken("refreshToken", refreshToken);
        this.invalidLogin = false;
        this.router.navigate(["/"]);
      },
      error: (err) => {
        console.error(err)
        this.invalidLogin = true;
      },
      complete: () => console.log('Login complete')
    });
  }
}
