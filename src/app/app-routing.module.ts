import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { AuthService } from './services/auth.service';


// TODO angular guards, transferservice, user service, reactive form with validation, pipes
const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"profile", component:ProfileComponent, canActivate:[AuthService]},
  {path:"admin",component:AdminComponent, canActivate:[AuthService]},
  {path:"transfer",component:TransferComponent, canActivate:[AuthService]},
  {path:"**", redirectTo: '/login', pathMatch: 'full' },
  {path:"", redirectTo: '/login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
