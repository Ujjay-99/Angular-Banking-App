import { Component } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { ITransaction } from 'src/app/ITransaction';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/IUserRegister';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserFull } from 'src/app/IUserFull';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  
  transactions:ITransaction[] = [];
  users:IUserFull[] = [];
  total:number = 0;
  tokenPayload:any;
  token:any;
  output:any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  transactionType:string ="D";
  amount:number = 0;
  userID:string = "";

  user:IUserFull = {
    firstName: "",
    lastName: "",
    balance : 0,
    email :"",
    id:"",
    isLocked:false,
    userName:""
  };
  
  constructor(private authService: AuthService, private dataService: DataService, private router:Router) {
    this.getUsers();
    this.dataService.GetAllTransactions()
            .subscribe(l => {
              l.forEach(i=>{
                this.transactions.push(i);
                this.total += i.amount;
              }) 
            });
  }

  getUsers(){
    this.dataService.GetUsers().subscribe(list =>{
      this.users = list;
    })
  }
  lockUser(id:string){
    this.dataService.LockUser(id).subscribe(res =>{
      console.log(res);
      alert("User Locked out.");
    });
  }

}









 // private refreshUser() {
  //   if (this.authService.getToken("accessToken") == null) {
  //     this.router.navigate(['/Admin']);
  //   }
  //   this.token = this.authService.getToken("accessToken");
  //   this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  //   this.output = JSON.parse(this.tokenPayload);
  //   this.userID = this.output['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

  //   this.dataService.GetUser(this.output['email']).subscribe(u => {
  //     this.user = u[0];
  //   });

  //   this.dataService.GetAllTransactions()
  //           .subscribe(l => {
  //             l.forEach(i=>{
  //               this.transactions.push(i);
  //               this.total += i.amount;
  //             }) 
  //           });
  // }