import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ngxCsv } from 'ngx-csv';
import { ITransaction } from 'src/app/ITransaction';
import { IUserRegister } from 'src/app/IUserRegister';
import { AuthService } from 'src/app/Service/auth.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  tokenPayload:any;
  token:any;
  transactions:ITransaction[] = [];
  output:any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  transactionType:string ="D";
  amount:number = 0;
  userID:string = "";
 transactionForm=new FormGroup({
  amountControl:new FormControl('',[Validators.min(500), Validators.max(1000000),Validators.required]),
  depositRadioControl:new FormControl(),
  withdrawRadiotControl:new FormControl()
 })
 transactValid(){
   console.warn(this.transactionForm.value);
   
 }
 get amountControl(){
  return this.transactionForm.get('firstNameControl');
}
   
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
  }
  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser() {
    console.log("User refreshed.")
    if (this.authService.getToken("accessToken") == null) {
      this.router.navigate(['/Login']);
    }
    this.token = this.authService.getToken("accessToken");
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
    this.output = JSON.parse(this.tokenPayload);
    this.userID = this.output['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    console.log("User ID " + this.userID);

    this.dataService.GetUser(this.output['email']).subscribe(u => {
      this.user = u[0];
      console.log("user: " + this.user);
    });
    this.refreshTransactions();
  }


  private refreshTransactions() {
    this.dataService.GetTransactions(this.userID)
      .subscribe(l => {
        this.transactions = l;
      });
  }

  onSubmit() {
    const payload = {
      amount: this.amount,
      transactionType: this.transactionType,
    } 
    this.dataService.DoTransaction(this.userID, payload)
    this.refreshUser();
  }

  results(){
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: `${this.user.firstName} ${this.user.lastName}`,
      useBom: true,
      noDownload: false,
      headers: ["Id", "UserId", "Date","Amount","Transaction Type"]
    };
    new ngxCsv(this.transactions, `${this.user.firstName}'s PassBook`, options);
    }
}