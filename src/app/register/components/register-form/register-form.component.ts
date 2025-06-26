import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register-form',
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  validatorSecret = '';
  error: string | null = null;
  success: boolean = false;

  constructor(private router: Router) {}

  async register() {
    this.error = null;
    this.success = false;
    if (!this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    try {
      const res = await fetch('http://localhost:5085/Admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          validatorSecret: this.validatorSecret
        })
      });
      if (!res.ok) {
        this.error = 'Registration failed.';
        return;
      }
      const result = await res.json();
      if (result && result.token) {
        localStorage.setItem('jwt', result.token);
        await this.router.navigate(['/action-log']);
        return;
      }
      this.success = true;
    } catch (e) {
      this.error = 'Network error.';
    }
  }
}
