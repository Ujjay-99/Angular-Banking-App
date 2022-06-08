import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }
  
  async canActivate(){
    const token = this.authService.getToken("accessToken");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    const isRefreshSuccess = await this.refreshingTokens(token);

    if (!isRefreshSuccess) {
      this.router.navigate(['/login']);
    }

    return isRefreshSuccess;
  }

  async refreshingTokens(token: string | null) {
    const refreshToken: string | null = this.authService.getToken("refreshToken");

    if (!token || !refreshToken) {
      return false;
    }

    const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {

      const response = await lastValueFrom(this.http.post(`http://localhost:5000/api/user/refreshtoken`, tokenModel));
      const newToken = (<any>response).accessToken;
      const newRefreshToken = (<any>response).refreshToken;
      this.authService.setToken("accessToken", newToken);
      this.authService.setToken("refreshToken", newRefreshToken);
      isRefreshSuccess = true;
      console.log("Token Refreshed.");
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}
