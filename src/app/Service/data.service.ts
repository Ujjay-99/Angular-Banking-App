import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransact } from '../ITransact';
import { ITransaction } from '../ITransaction';
import { IUserFull } from '../IUserFull';
import { IUserRegister } from '../IUserRegister';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  header : any;  
  constructor(private http: HttpClient) { }

  CreateUser(register:IUserRegister){  
    console.log(register);  
    return this.http.post(`http://localhost:5000/api/user/register`, register);
  } 

  Login(login:any){   
    return this.http.post(`http://localhost:5000/api/user/login`, login);
  } 

  AdminLogin(login:any){   
    return this.http.post(`http://localhost:5000/api/user/adminlogin`, login);
  } 

  GetUser(email:string){
    console.log("Get user from service");
    return this.http.get<IUserRegister[]>(`http://localhost:5000/api/User/getByEmail/${email}`);
  }

  GetTransactions(UserID:string){
    return this.http.get<ITransaction[]>(`http://localhost:5000/api/Transactions/getall/${UserID}`);
  }

  GetAllTransactions(){
    return this.http.get<ITransaction[]>(`http://localhost:5000/api/Transactions/getall`);
  }
  
  GetUsers(){
    return this.http.get<IUserFull[]>(`http://localhost:5000/api/User/getusers`);
  }

  LockUser(userId:string){
    return this.http.get(`http://localhost:5000/api/User/lock/${userId}`);
  }

  DoTransaction(userID:string, transactions:ITransact){
    console.log("transaction initiated" + transactions);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const link = "http://localhost:5000/api/Transactions/add/";
    this.http.post(link+userID, transactions, httpOptions).subscribe(res=>{
      console.log(res);
    });
  }
}
