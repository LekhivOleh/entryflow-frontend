import { Component } from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {ActionLogEmployeesLogComponent} from './components/action-log-employees-log/action-log-employees-log.component';
import {ActionLogEmployeesTabComponent} from './components/action-log-employees-tab/action-log-employees-tab.component';

@Component({
  selector: 'app-action-log',
  imports: [
    HeaderComponent,
    ActionLogEmployeesLogComponent,
    ActionLogEmployeesTabComponent
  ],
  templateUrl: './action-log.component.html',
  styleUrl: './action-log.component.css'
})
export class ActionLogComponent {

}
