import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private router: Router) {}

  async login() {
    this.error = null;
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }
    try {
      const res = await fetch('http://localhost:5085/Admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });
      if (!res.ok) {
        this.error = 'Login failed.';
        return;
      }
      const result = await res.json();
      if (result && result.token) {
        localStorage.setItem('jwt', result.token);
        await this.router.navigate(['/action-log']);
        return;
      }
      this.error = 'Invalid response from server.';
    } catch (e) {
      this.error = 'Network error.';
    }
  }
}
