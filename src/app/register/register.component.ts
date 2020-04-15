import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    email: null,
    password: null
  }

  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    console.log(this.registerUserData)
 
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        console.log(res)
        this._router.navigate(['/special'])
      },
      err => console.log(err)
    )   
  }

}
