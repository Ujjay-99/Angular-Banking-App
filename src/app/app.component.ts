import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './Service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoreBankingApp';
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private authService: AuthService, private router:Router){}

  isUserAuthorized() {
    const token: string | null = this.authService.getToken("accessToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/Login']);
  }
}
