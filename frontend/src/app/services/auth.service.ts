import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

export class RegisterDto {
  name!: string;
  email!: string;
  password!: string;
  role?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.decodeCurrentUser()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private decodeCurrentUser(): User | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
      const currentUser = localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser') as string)
        : null;

      return currentUser ? { ...currentUser, role: currentUser.role } : null;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ access_token: string; user: User }>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        map((response) => {
          if (response && response.access_token && response.user) {
            localStorage.setItem('authToken', response.access_token);
            localStorage.setItem('currentUser', JSON.stringify(response.user)); // Make sure to store the 'user' object
            this.currentUserSubject.next(response.user); // Update BehaviorSubject with the 'user' object
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      map((response) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
        return response.user;
      })
    );
  }
}
