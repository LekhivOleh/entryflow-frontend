import { Component } from '@angular/core';
import {ConsoleLogger} from '@angular/compiler-cli';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
