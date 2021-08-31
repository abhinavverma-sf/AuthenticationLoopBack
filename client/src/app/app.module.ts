import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShowapiComponent } from './showapi/showapi.component';
import { EditTableComponent } from './edit-table/edit-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowcustomersComponent } from './showcustomers/showcustomers.component';
import { EditcustomersComponent } from './editcustomers/editcustomers.component';
import { ShowusersComponent } from './showusers/showusers.component';
import { EditusersComponent } from './editusers/editusers.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { DataService } from './data.service';
import { CustomerServiceService } from './customer-service.service';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ShowapiComponent,
    EditTableComponent,
    ShowcustomersComponent,
    EditcustomersComponent,
    ShowusersComponent,
    EditusersComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [AuthService,AuthGuard,DataService,CustomerServiceService, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
