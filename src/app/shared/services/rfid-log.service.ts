import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RfidLog {
  id: string;
  validatorId: string;
  employeeId: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5085/RfidLog';

  constructor(private http: HttpClient) {}

  getRfidLogs(): Observable<RfidLog[]> {
    return this.http.get<RfidLog[]>(this.apiUrl);
  }
}
