import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  ifLogout = signal(false);
  handleLogout() {
    document.cookie = 'jwt=; Max-Age=0; path=/';
    localStorage.removeItem('jwt');
    window.location.href = '/login';
  }
}
