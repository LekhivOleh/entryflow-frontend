import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {employeesList} from '../../../shared/utils/employees'

@Component({
  selector: 'app-action-log-employees-log',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './action-log-employees-log.component.html',
  styleUrl: './action-log-employees-log.component.css'
})
export class ActionLogEmployeesLogComponent {
  convertTime(date: Date) {
      return `${date.getHours().toString()}:${date.getMinutes().toString()}`;
  }

  employees = employeesList;
}
