import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import employeesList from '../../../shared/utils/employees';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-employee-page-log',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './employee-page-log.component.html',
  styleUrl: './employee-page-log.component.css'
})
export class EmployeePageLogComponent {
  employee: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.employee = employeesList.find(emp => emp.id === Number(id));
    });
  }
}
