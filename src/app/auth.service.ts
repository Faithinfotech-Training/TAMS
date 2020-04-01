import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

export class JwtResponse {
  constructor(
    public jwttoken: string,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  public loginVerify(user: User) {
    console.log(user.userName);
    console.log(user.password);
    // calling webservice url and passing username and password
    return this.httpClient.get<User>(environment.apiUrl + "/user-login/" + user.userName + "&" + user.password)
    
  }

  //JWT Token
  public attemptAuth(uName: string, pWord: string): Observable<any> {
    const credentials = { username: uName, password: pWord };
    console.log('Attempt Authorize ::');
    return this.httpClient.post(environment.jwtUrl + 'authenticate', credentials).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', uName);
          // let tokenStr= 'Bearer '+userData.token;
          // sessionStorage.setItem('token', tokenStr);
          console.log("Service...");
          console.log(userData);
          return userData;
        }
      )

    );
  }

  //Credentials
  public isLoggedIn() {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      console.log("isLoggedIn...")
      if (localStorage.getItem('ACCESS_ADMIN') == null && localStorage.getItem('ACCESS_MANAGER') == null) {
        this.router.navigateByUrl('login');
      }
      else {
        return localStorage.getItem('ACCESS_ADMIN') !== null || localStorage.getItem('ACCESS_MANAGER') !== null;
      }
    }
    else {
      this.router.navigateByUrl('login');
    }
  }

  public logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    localStorage.removeItem('ACCESS_ADMIN');
    localStorage.removeItem('ACCESS_MANAGER');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('username');
  }
}
