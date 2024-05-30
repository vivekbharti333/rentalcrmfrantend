import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/core/core.index';
import { MessageService } from 'primeng/api';
import { WebsiteSettingService } from '../website-setting.service';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrl: './company-settings.component.scss',
  providers: [MessageService]
})
export class CompanySettingsComponent {
  constructor(
    private router: Router,
    private sidebar: SidebarService,
    private messageService: MessageService,
    private websiteSettingService: WebsiteSettingService
  ) {}


  public comapany = {
    loginPageWallpaper: '',
    loginPageLogo: '',
    ipAddress: '',
    displayLogo: '',
    displayName: '',
    emailId: '',
    website: '',
    phoneNumber: ''
  }

  loginPageWallpaperBase64(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result.split(',')[1]; // Get the base64 part

        // Set the base64 string to the userPicture field
        this.comapany.loginPageLogo = "data:image/jpeg;base64,"+base64String;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  loginPageLogoBase64(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result.split(',')[1]; // Get the base64 part

        // Set the base64 string to the userPicture field
        this.comapany.displayLogo = "data:image/jpeg;base64,"+base64String;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  displayLogoBase64(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result.split(',')[1]; // Get the base64 part

        // Set the base64 string to the userPicture field
        this.comapany.loginPageWallpaper = "data:image/jpeg;base64,"+base64String;
      };
      reader.readAsDataURL(selectedFile);
    }
  }


  submitCompanyForm(){
    this.websiteSettingService.saveCompanyDetails(this.comapany)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
    
              this.messageService.add({
                summary: response['payload']['respCode'],
                detail: response['payload']['respMesg'],
                styleClass: 'success-background-popover',
              });

            } else {
              this.messageService.add({
                summary: response['payload']['respCode'],
                detail: response['payload']['respMesg'],
                styleClass: 'danger-background-popover',
              });
            }
          } else {
            this.messageService.add({
              summary: response['payload']['responseCode'],
              detail: response['payload']['responseMesg'],
              styleClass: 'danger-background-popover',
            });
          }
        },
        // error: (error: any) => this.toastr.error('Server Error', '500'),
        error: (error: any) =>  this.messageService.add({
          summary: '500',
          detail: 'Server Error',
        }),
      });
      // this.isLoading = false;
  }


  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
  public filter = false;
  openFilter() {
    this.filter = !this.filter;
  }



}
