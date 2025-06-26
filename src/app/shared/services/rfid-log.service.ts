import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  export interface RfidLog {
    id: string;
    validatorId: string;
    employeeId: string;
    timestamp: Date;
  }

  function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function getEmailFromJwt(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email || null;
    } catch {
      return null;
    }
  }

  @Injectable({
    providedIn: 'root'
  })
  export class RfidLogService {
    private apiUrl = 'http://localhost:5085/RfidLog';

    constructor(private http: HttpClient) {}

    getRfidLogs(): Observable<RfidLog[]> {
      const jwt = getCookie('jwt') || localStorage.getItem('jwt');
      const email = jwt ? getEmailFromJwt(jwt) : null;
      if (!email) throw new Error('Email not found in JWT');
      return this.http.get<RfidLog[]>(`${this.apiUrl}/by-admin/${email}`);
    }
  }
