import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import employeesList from '../../../shared/utils/employees';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-action-log-employees-tab',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './action-log-employees-tab.component.html',
  styleUrl: './action-log-employees-tab.component.css',
})

export class ActionLogEmployeesTabComponent {
  employees = employeesList;
}
