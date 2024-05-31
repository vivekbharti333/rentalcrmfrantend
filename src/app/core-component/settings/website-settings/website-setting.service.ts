import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from 'src/app/core/constant/constants';

@Injectable({
  providedIn: 'root'
})
export class WebsiteSettingService {

  public loginUser: any;

  constructor(
    private http: HttpClient,
  ) { }

  saveCompanyDetails(comapny: any): Observable<any> {
    let request: any = {
      payload: {
        loginPageWallpaper : comapny.loginPageWallpaper,
        loginPageLogo: comapny.loginPageLogo,
        ipAddress: comapny.ipAddress,
        displayLogo: comapny.displayLogo,
        displayName: comapny.displayName,
        emailId: comapny.emailId,
        website: comapny.website,
        phoneNumber: comapny.phoneNumber,
        token: comapny.phoneNumber,
        superadminId: 'MAINADMIN',
      }
    };
    return this.http.post<any>(Constant.Site_Url + "addUpdateApplicationHeader", request);
  }

  getApplicationDetailsList(): Observable<any> {
    let request: any = {
      payload: {
        token: '',
        superadminId: 'MAINADMIN',
      }
    };
    return this.http.post<any>(Constant.Site_Url + "getApplicationHeaderDetails", request);
  }
}
