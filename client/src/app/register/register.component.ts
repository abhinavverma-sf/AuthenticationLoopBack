import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  successMessage:string =""
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  
  addUserForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    middlename: [''],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required]],
    password:['',[Validators.required, Validators.minLength(8)]],
    phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
    address: ['', [Validators.required]],
    username: ['',[Validators.required]],
    role: [1],
    customerId: [2]
  })
  ngOnInit() {
   
  }
  onSubmit() {
    
    this.authService.signUp(this.addUserForm.value).subscribe((response:any) => {
      console.log(JSON.stringify(response));
      
      this.router.navigateByUrl('/login');
    }, error => {

      console.log(error.message);

    })
  }

}
