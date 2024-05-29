import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']  // Corrected property name
})
export class SigninComponent {
  public routes = routes;
  constructor(private router: Router) {}

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

  public validateUser(){
    alert(123);
    alert(this.login.loginId + " , " + this.login.password);
    localStorage.setItem('menuPermission', JSON.stringify(['admindb', 'admindbn', 'usermang', 'usermang1']));
    this.router.navigate([routes.adminDashboard]);
  }
}