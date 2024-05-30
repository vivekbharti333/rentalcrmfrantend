import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes';
import { UserManagementService } from 'src/app/core-component/user-management/user-management.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],  // Corrected property name
  providers: [MessageService],
})
export class SigninComponent {
  public routes = routes;
  constructor(
    private router: Router,
    private userManagementService: UserManagementService,
    private messageService: MessageService
  ) {}

  navigation() {
    localStorage.setItem('menuPermission', JSON.stringify(['admindb', 'admindbn', 'usermang', 'usermang1']));
    this.router.navigate([routes.adminDashboard])
  }
  
  public password: boolean[] = [false];  // Ensure sufficient elements in the array

  public togglePassword(index: number){
    this.password[index] = !this.password[index];
  }

  public login = {
    loginId: '',
    password: '',
  };

  show() {
    this.messageService.add({
      summary: 'Code',
      detail: 'Hello, world! This is a toast message.',
    });
  }


  validateUser() {
    this.userManagementService.doLogin(this.login)
      .subscribe({
        next: (response: any) => {
          if (response['responseCode'] == '200') {
            if (response['payload']['respCode'] == '200') {
              let permission = response['payload']['permissions'];
              localStorage.setItem('menuPermission', JSON.stringify(permission));
              // localStorage.setItem('menuPermission', JSON.stringify(['admindb', 'admindbn', 'usermang', 'usermang1']));
              // this.router.navigate([routes.adminDashboard]);
              
              this.messageService.add({
                summary: response['payload']['respCode'],
                detail: response['payload']['respMesg'],
                styleClass: 'success-background-popover',
              });
              this.router.navigate([routes.adminDashboard]);
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

}