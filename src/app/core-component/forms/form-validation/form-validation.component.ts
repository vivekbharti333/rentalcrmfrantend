import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
})
export class FormValidationComponent {
  public routes = routes;
}
