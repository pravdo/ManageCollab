import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear local storage or specific items like 'currentUser' or 'authToken'
    localStorage.clear(); // Or localStorage.removeItem('authToken');

    // Navigate to the login page after logout
    this.router.navigate(['/login']);
  }
}
