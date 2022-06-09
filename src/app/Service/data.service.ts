import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransaction } from '../ITransaction';
import { IUserRegister } from '../IUserRegister';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  header : any;  
  constructor(private http: HttpClient) { }

  CreateUser(register:IUserRegister){  
    console.log(register);  
    return this.http.post(`http://localhost:5000/api/user/register`, register)
  } 

  Login(login:any){   
    return this.http.post(`http://localhost:5000/api/user/login`, login)
  } 

  AdminLogin(login:any){   
    return this.http.post(`http://localhost:5000/api/user/adminlogin`, login)
  } 

  GetUser(email:string){
    return this.http.get<IUserRegister[]>(`http://localhost:5000/api/User/getByEmail/${email}`)
  }

  GetTransactions(UserID:string){
    return this.http.get<ITransaction[]>(`http://localhost:5000/api/Transactions/getall/${UserID}`)
  }

  GetAllTransactions(){
    return this.http.get<ITransaction[]>(`http://localhost:5000/api/Transactions/getall`)
  }

  DoTransaction(userID:string, transaction:any){
    console.log("transaction initiated" + transaction);
    
    return this.http.post(`http://localhost:5000/api/Transactions/add/${userID}`, transaction)
  }
}
