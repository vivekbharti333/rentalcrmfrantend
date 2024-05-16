import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { RolesPermissionsComponent } from './roles-permissions/roles-permissions.component';
// import { AddUserComponent } from './add-user/add-user.component';
import { UsersComponent } from './users/users.component';
import { PermissionsComponent } from './permissions/permissions.component';


@NgModule({
  declarations: [
    UserManagementComponent,
    DeleteAccountComponent,
    RolesPermissionsComponent,
    // AddUserComponent,
    UsersComponent,
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    sharedModule
  ]
})
export class UserManagementModule { }
