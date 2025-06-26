import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  cardUid: string;
  validatorId: string;
}

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private apiUrl = 'http://localhost:5085/Employee';

  constructor(private http: HttpClient) {}

  getEmployeesByAdmin(email: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/by-admin/${email}`);
  }
}
