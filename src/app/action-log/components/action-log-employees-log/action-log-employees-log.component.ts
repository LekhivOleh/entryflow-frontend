import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { RfidLog, RfidLogService } from '../../../shared/services/rfid-log.service';
import { EmployeeService } from '../../../shared/services/employee.service';

interface EmployeeLogEntry extends RfidLog {
  employeeFirstName: string;
  employeeLastName: string;
  action: string;
  timestamp: Date;
}

@Component({
  selector: 'app-action-log-employees-log',
  templateUrl: './action-log-employees-log.component.html',
  styleUrls: ['./action-log-employees-log.component.css'],
  imports: [NgForOf, NgIf]
})
export class ActionLogEmployeesLogComponent implements OnInit, OnDestroy {
  convertTime(date: Date) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  logs: EmployeeLogEntry[] = [];
  private polling = true;
  private pollingInterval = 5000; // 5 seconds

  constructor(
    private rfidLogService: RfidLogService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.polling = false;
  }

  private startPolling() {
    const poll = () => {
      if (!this.polling) return;
      this.rfidLogService.getRfidLogs().subscribe((data: RfidLog[]) => {
        const token = localStorage.getItem('jwt');
        const email = token ? getEmailFromJwt(token) : null;
        if (!email) {
          this.logs = [];
          if (this.polling) setTimeout(poll, this.pollingInterval);
          return;
        }
        this.employeeService.getEmployeesByAdmin(email).subscribe((employees: any[]) => {
          // Filter logs to only today's date
          const today = new Date();
          const todayYear = today.getFullYear();
          const todayMonth = today.getMonth();
          const todayDate = today.getDate();
          const todaysLogs = data.filter((log: RfidLog) => {
            const logDate = new Date(log.timestamp);
            return (
              logDate.getFullYear() === todayYear &&
              logDate.getMonth() === todayMonth &&
              logDate.getDate() === todayDate
            );
          });

          const logsByEmployeeDate: { [key: string]: RfidLog[] } = {};
          todaysLogs.forEach((log: RfidLog) => {
            const dateObj = new Date(log.timestamp);
            const dateKey = `${log.employeeId}_${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
            if (!logsByEmployeeDate[dateKey]) {
              logsByEmployeeDate[dateKey] = [];
            }
            logsByEmployeeDate[dateKey].push({ ...log, timestamp: dateObj });
          });

          const logsWithAction: EmployeeLogEntry[] = [];
          Object.values(logsByEmployeeDate).forEach((logsArr: RfidLog[]) => {
            logsArr.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            logsArr.forEach((log: any, idx: number) => {
              const employee = employees.find((e: any) => e.id === log.employeeId);
              logsWithAction.push({
                ...log,
                employeeFirstName: employee ? employee.firstName : 'Unknown',
                employeeLastName: employee ? employee.lastName : 'Unknown',
                action: idx % 2 === 0 ? 'Entered' : 'Left',
                timestamp: log.timestamp as Date
              });
            });
          });

          this.logs = logsWithAction.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
          if (this.polling) setTimeout(poll, this.pollingInterval);
        }, () => {
          if (this.polling) setTimeout(poll, this.pollingInterval);
        });
      }, () => {
        if (this.polling) setTimeout(poll, this.pollingInterval);
      });
    };
    poll();
  }
}

// ...existing getEmailFromJwt function...
function getEmailFromJwt(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email || null;
  } catch {
    return null;
  }
}
