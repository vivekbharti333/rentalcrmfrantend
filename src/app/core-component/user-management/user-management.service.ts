import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { Constant } from './services/constant';
// import { UserDetails, UserDetailsRequest } from '../interface/user-management';
// import { AuthenticationService } from './services/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  public loginUser: any;

  constructor(
    private http: HttpClient,
    // private authenticationService: AuthenticationService,
  ) {
    // this.loginUser = this.authenticationService.getLoginUser();
  }

  getUserDetailsList(): Observable<any> {
    let request: any = {
      payload: {
        // requestedFor: 'ALL',
        // roleType: this.loginUser['roleType'],
        // token: this.loginUser['token'],
        // createdBy: this.loginUser['loginId'],
        // superadminId: this.loginUser['superadminId'],
        requestedFor: 'ALL',
        roleType: 'MAINADMIN',
        token: '',
        createdBy: 'MAINADMIN',
        superadminId: 'MAINADMIN',
      }
    };
    return this.http.post<any>("http://192.168.29.119:8080/rentalcrm/getUserDetails", request);
  }


  saveUserDetails(user:any): Observable<any> {
    user.firstname
    let request: any = {
      payload: {
        firstName: user.firstName,
        lastName: user.lastName,
        token: '',
        createdBy: 'MAINADMIN',
        superadminId: 'MAINADMIN',
        
      }
    };
    return this.http.post<any>("http://192.168.29.119:8080/rentalcrm/userRegistration", request);
  }


}
