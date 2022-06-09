import { Component } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { ITransaction } from 'src/app/ITransaction';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/IUserRegister';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  
  transactions:ITransaction[] = Array<ITransaction>();
  total:number = 0;
  tokenPayload:any;
  token:any;
  output:any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  transactionType:string ="D";
  amount:number = 0;
  userID:string = "";

  user:IUserRegister = {
    firstName: "",
    lastName: "",
    balance : 0,
    email :"",
    password: "",
    confirmPassword : "",
    role: "",
  };
  
  constructor(private authService: AuthService, private dataService: DataService, private router:Router) {
    this.refreshUser(); 
  }

  private refreshUser() {
    if (this.authService.getToken("accessToken") == null) {
      this.router.navigate(['/Admin']);
    }
    this.token = this.authService.getToken("accessToken");
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
    this.output = JSON.parse(this.tokenPayload);
    this.userID = this.output['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    this.dataService.GetUser(this.output['email']).subscribe(u => {
      this.user = u[0];
    });

    this.dataService.GetAllTransactions()
            .subscribe(l => {
              l.forEach(i=>{
                this.transactions.push(i);
                this.total += i.amount;
              }) 
            });
  }
}
