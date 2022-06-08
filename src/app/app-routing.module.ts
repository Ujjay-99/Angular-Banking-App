import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { AdminComponent } from './admin/login/admin.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user-home/user.component';

const routes: Routes = [
  {path:'#',component:AppComponent},
  {path:'Login',component:LoginComponent},
  {path:'Register',component:RegisterComponent},
  {path:'UserHome',component:UserComponent},
  {path:'Admin',component:AdminComponent},
  {path:'RegisterAdmin',component:AdminRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
