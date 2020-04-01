import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  loginUser: User;
  error = '';

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    // checking if user logged in or not
    if (localStorage.getItem('ACCESS_ADMIN') !== null)
      this.router.navigateByUrl('/admin');
    else if (localStorage.getItem('ACCESS_CEO') !== null)
      this.router.navigateByUrl('/ceo');

    // formGroup 
    this.loginForm = this.formBuilder.group({

      userName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required]]

    });
  }
  get formControls() { return this.loginForm.controls; }

  login() {

    this.isSubmitted = true

    //invalid entry in form
    if (this.loginForm.invalid)
      return;

    // valid entry
    if (this.loginForm.valid) {

      this.authService.attemptAuth(this.loginForm.controls.userName.value, this.loginForm.controls.password.value).subscribe(
        data => {
          console.log("Login TS...");
          console.log(data);
          sessionStorage.setItem('username', this.loginForm.controls.userName.value);
          let tokenStr = 'Bearer ' + data.token;
          sessionStorage.setItem('token', tokenStr);
          //this.router.navigateByUrl('admin');
          this.getRole();
        },
        error => {
          this.error = "Sorry! Invalid credentials."
        }
      );
    }
    else
      return;
  }

  getRole() {
    //calling method from AuthService
    this.authService.loginVerify(this.loginForm.value).subscribe(data => {
      this.loginUser = data;

      //checking roleId
      if (data.roleDetails.roleId === 1) {
        // logged as CEO
        localStorage.setItem("ACCESS_MANAGER", "logged");
        localStorage.setItem("username", data.userName);
        this.router.navigateByUrl('manager');

      }
      else if (data.roleDetails.roleId === 2) {
        // logged as Admin/Cordinator
        console.log(data.roleDetails.roleId);
        localStorage.setItem("ACCESS_ADMIN", "logged");
        localStorage.setItem("username", data.userName);
        this.router.navigateByUrl('admin');
      }
      else {
        this.error = "Sorry... This Role is Not Allowed To Access This System"
      }
    },
      error => {
        this.error = "Invalid Username and Password"
      });
  }

}
