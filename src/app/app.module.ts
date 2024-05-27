import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './common-component/loader/loader.component';
import { sharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule,MatFormFieldModule, sharedModule, BrowserAnimationsModule, ToastrModule],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
