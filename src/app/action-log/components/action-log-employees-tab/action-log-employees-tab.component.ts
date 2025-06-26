import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../../shared/services/employee.service';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-action-log-employees-tab',
  templateUrl: './action-log-employees-tab.component.html',
  imports: [
    RouterLink,
    NgForOf,
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./action-log-employees-tab.component.css']
})

export class ActionLogEmployeesTabComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    const email = token ? this.getEmailFromJwt(token) : null;
    if (!email) {
      return;
    }
    this.employeeService.getEmployeesByAdmin(email).subscribe(data => {
      this.employees = data;
    });

  }

  private getEmailFromJwt(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email || null;
    } catch {
      return null;
    }
  }
}
