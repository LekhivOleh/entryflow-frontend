import {Component} from '@angular/core';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {RegisterHeaderComponent} from './components/register-header/register-header.component';

@Component({
  selector: 'app-register',
  imports: [
    RegisterFormComponent,
    RegisterHeaderComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
