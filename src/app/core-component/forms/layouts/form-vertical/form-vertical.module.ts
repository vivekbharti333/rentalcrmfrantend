import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormVerticalRoutingModule } from './form-vertical-routing.module';
import { FormVerticalComponent } from './form-vertical.component';
import { sharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FormVerticalComponent
  ],
  imports: [
    CommonModule,
    FormVerticalRoutingModule,
    sharedModule
  ]
})
export class FormVerticalModule { }
