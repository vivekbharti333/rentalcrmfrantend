import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from 'src/app/core/constant/constants';
import { CookieService } from 'ngx-cookie-service';
// import { UserDetails, UserDetailsRequest } from '../interface/user-management';
// import { AuthenticationService } from './services/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  public loginUser: any;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
    // private authenticationService: AuthenticationService,
  ) {
    // this.loginUser = this.authenticationService.getLoginUser();
  }

  doLogin(login: any): Observable<any> {
    let request: any = {
      payload: {
        loginId: login.loginId,
        password: login.password,
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"doLogin",request);
  }

  getUserDetailsList(): Observable<any> {

    this.loginUser = JSON.parse(this.cookieService.get('loginDetails'))
    let request: any = {
      payload: {
        // requestedFor: 'ALL',
        // roleType: this.loginUser['roleType'],
        // token: this.loginUser['token'],
        // createdBy: this.loginUser['loginId'],
        // superadminId: this.loginUser['superadminId'],
        requestedFor: 'ALL',
        roleType: this.loginUser['roleType'],
        token: this.loginUser['token'],
        createdBy: this.loginUser['loginId'],
        superadminId: this.loginUser['superadminId'],
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"getUserDetails",request);
  }

  getAddressListByUserId(userId:any): Observable<any> {
    let request: any = {
      payload: {
        requestedFor: 'ALL',
        roleType: 'MAINADMIN',
        token: '',
        loginId: userId,
        superadminId: 'MAINADMIN',
      }
    };
    return  this.http.post<any>(Constant.Site_Url+"getAddressDetails",request);
  }


  saveUserDetails(user: any): Observable<any> {
    this.cookieService.get('loginDetails')
    user.firstname
    let request: any = {
      payload: {
        userPicture: user.userPicture,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        roleType: user.roleType,
        mobileNo: user.mobileNo,
        dob: user.dob,
        alternateMobile: user.alternateMobile,
        idDocumentType: user.idDocumentType,
        idDocumentPicture: user.idDocumentPicture,
        panNumber: user.panNumber,
        
        emergencyContactRelation1: user.emergencyContactRelation1,
        emergencyContactName1: user.emergencyContactName1,
        emergencyContactNo1: user.emergencyContactNo1,
        emergencyContactRelation2: user.emergencyContactRelation2,
        emergencyContactName2: user.emergencyContactName2,
        emergencyContactNo2: user.emergencyContactNo2,
        addressList: user.addressList,

        token: '',
        createdBy: 'MAINADMIN',
        superadminId: 'MAINADMIN',

      }
    };
    return  this.http.post<any>(Constant.Site_Url+"userRegistration",request);
  }

  updateUserDetails(user: any): Observable<any> {
    user.firstname
    let request: any = {
      payload: {
        userPicture: user.userPicture,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        roleType: user.roleType,
        mobileNo: user.mobileNo,
        dob: user.dob,
        alternateMobile: user.alternateMobile,
        idDocumentType: user.idDocumentType,
        idDocumentPicture: user.idDocumentPicture,
        panNumber: user.panNumber,
        
        emergencyContactRelation1: user.emergencyContactRelation1,
        emergencyContactName1: user.emergencyContactName1,
        emergencyContactNo1: user.emergencyContactNo1,
        emergencyContactRelation2: user.emergencyContactRelation2,
        emergencyContactName2: user.emergencyContactName2,
        emergencyContactNo2: user.emergencyContactNo2,
        addressList: user.addressList,

        token: '',
        createdBy: 'MAINADMIN',
        superadminId: 'MAINADMIN',

      }
    };
    return  this.http.post<any>(Constant.Site_Url+"userRegistration",request);
  }


}
