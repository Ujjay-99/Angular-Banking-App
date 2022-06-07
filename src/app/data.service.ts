import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRegister } from './IUserRegister';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  RegisterUser(data:any) {
    let url = `http://localhost:5000/api/user/register`;
    return this.http.post(url,data)
  }
}
