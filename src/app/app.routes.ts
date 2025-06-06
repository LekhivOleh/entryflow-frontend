import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home.component').then(m => m.HomeComponent);
    },
  },
  {
    path: 'register',
    loadComponent: () => {
      return import('./register/register.component').then(m => m.RegisterComponent);
    }
  },
  {
    path: 'login',
    loadComponent: () => {
      return import('./login/login.component').then(m => m.LoginComponent);
    }
  },
  {
    path: 'action-log',
    loadComponent: () => {
      return import('./action-log/action-log.component').then(m => m.ActionLogComponent);
    }
  },
  {
    path: 'employee/:id',
    loadComponent: () => {
      return import('./employee-page/employee-page.component').then(m => m.EmployeePageComponent);
    }
  }
];
