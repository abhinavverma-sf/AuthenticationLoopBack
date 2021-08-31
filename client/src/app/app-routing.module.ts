import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EditTableComponent } from './edit-table/edit-table.component';
import { EditcustomersComponent } from './editcustomers/editcustomers.component';
import { EditusersComponent } from './editusers/editusers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowapiComponent } from './showapi/showapi.component';
import { ShowcustomersComponent } from './showcustomers/showcustomers.component';
import { ShowusersComponent } from './showusers/showusers.component';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'view-members', component: ShowapiComponent, canActivate: [AuthGuard]},
  { path: 'editMembers/:id', component: EditTableComponent, canActivate: [AuthGuard]},
  { path: 'view-customers', component: ShowcustomersComponent, canActivate: [AuthGuard]},
  { path: 'editCustomers/:id', component: EditcustomersComponent, canActivate: [AuthGuard]},
  { path: 'showusers/:id', component: ShowusersComponent , canActivate: [AuthGuard]},
  { path: 'editUsers/:id', component: EditusersComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
