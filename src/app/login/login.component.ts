import { Component } from '@angular/core';
import {LoginHeaderComponent} from './components/login-header/login-header.component';
import {LoginFormComponent} from './components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  imports: [LoginHeaderComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

}
