import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email:"",
    password:""
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.login(this.credentials).subscribe((response:any)=>{
      
      localStorage.setItem('token',response.token);
      
      this.router.navigateByUrl('/view-customers')
     
    }, err=>{
      alert(`Invalid Credentials`)
      console.log(err)
    })
  }

}
