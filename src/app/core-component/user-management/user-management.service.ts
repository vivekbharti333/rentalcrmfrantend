import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from 'src/app/core/constant/constants';
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
    return  this.http.post<any>(Constant.Site_Url+"getUserDetails",request);

  }


  saveUserDetails(user: any): Observable<any> {
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
