import { Component } from '@angular/core';
import { SidebarService, routes } from 'src/app/core/core.index';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  // public userForm: FormGroup = new FormGroup({});

  constructor( private sidebar: SidebarService,
    private fb: FormBuilder,
  ){

  }

  ngOnInit() {
    // this.createForms();
  }

  userForm = {
    firstname: '',
    lastName: ''
  };

  submitUserForm(){
// console.log(this.userForm+" hkkggyghhghjg");
  }

  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
}
