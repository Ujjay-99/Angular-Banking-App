import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRegister } from '../IUserRegister';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  header : any;  
  constructor(private http: HttpClient) { }
  // RegisterUser(data:any ,body: IUserRegister) {
  //   let url = `http://localhost:5000/api/user/register`;
  //   return this.http.post(url,data)
  // }
  CreateUser(register:IUserRegister)  
  {  
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    console.log(register);  
    return this.http.post(`http://localhost:5000/api/user/register`, register)  
  } 
}
