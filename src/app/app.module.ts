import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user-home/user.component';

import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AdminComponent } from './admin/login/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './Service/data.service';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { AuthService } from './Service/auth.service';
import { BearerInterceptor } from './Service/bearer-interceptor.interceptor';
import { AuthGuardService } from './Service/auth-guard.service';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AdminRegisterComponent,
    AdminHomeComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [AuthGuardService, DataService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
