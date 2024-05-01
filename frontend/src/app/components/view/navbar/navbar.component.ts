import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isDropdownOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private elRef: ElementRef
  ) {}

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Check if the click target is outside the element
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isDropdownOpen = false; // Close dropdown upon logout
  }

  getInitials(): string {
    const user = this.authService.currentUserValue;
    return user && user.name
      ? user.name
          .split(' ')
          .map((part) => part[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)
      : '??';
  }
}
