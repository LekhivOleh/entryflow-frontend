import { Component } from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {EmployeePageLogComponent} from './components/employee-page-log/employee-page-log.component';
import {EmployeePageGraphComponent} from './components/employee-page-graph/employee-page-graph.component';
import {
  EmployeePageDateSelectorComponent
} from './components/employee-page-date-selector/employee-page-date-selector.component';

@Component({
  selector: 'app-employee-page',
  imports: [
    HeaderComponent,
    EmployeePageLogComponent,
    EmployeePageGraphComponent,
    EmployeePageDateSelectorComponent
  ],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent {

}
