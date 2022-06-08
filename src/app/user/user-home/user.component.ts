import { Component, OnInit } from '@angular/core';
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
export class UserComponent implements OnInit {

  tokenPayload:any;
  token:any;
  transactions:ITransaction[] = Array<ITransaction>();
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
    this.token = authService.getToken("accessToken");
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
    this.output = JSON.parse(this.tokenPayload);
    this.userID = this.output['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    dataService.GetUser(this.output['email']).subscribe(u => {
      this.user = u[0];
      
    });
    
    dataService.GetTransactions(this.userID)
            .subscribe(l => {
              l.forEach(i=>{
                this.transactions.push(i);
              }) 
            });
  }

  ngOnInit(): void {
    if(this.authService.getToken("accessToken")==null){
      this.router.navigate(['/Login'])
    }
  }

  onSubmit() {
    console.log("Clicked.");
    
    const payload = {
      amount: this.amount,
      created: Date.UTC.toString(),
      id: 0,
      transactionType: this.transactionType,
      userId: this.userID
    }
    this.dataService.DoTransaction(this.userID, payload)
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
    // new ngxCsv(this.transactions,  `${this.user.firstName}'s PassBook`);
    }
}