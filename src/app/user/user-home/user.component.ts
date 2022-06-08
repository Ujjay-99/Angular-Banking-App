import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ITransaction } from 'src/app/ITransaction';
import { IUserRegister } from 'src/app/IUserRegister';
import { AuthService } from 'src/app/Service/auth.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  tokenPayload:any;
  token:any;
  user:IUserRegister = {
    firstName: "sfsdfs",
    lastName: "",
    balance : 0,
    email :"",
    password: "",
    confirmPassword : "",
    role: "",
  };
  transactions:ITransaction[] = Array<ITransaction>();

  output:any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private authService: AuthService, private dataService: DataService) {
    this.token = authService.getToken("accessToken");
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
    this.output = JSON.parse(this.tokenPayload);
    console.log(this.tokenPayload);

    dataService.GetUser(this.output['email']).subscribe(u => {
      this.user = u[0];
      
    });
    
    dataService.GetTransactions(this.output['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
            .subscribe(l => {
              l.forEach(i=>{
                this.transactions.push(i);
              }) 
            });
  }

  ngOnInit(): void {
  }

}