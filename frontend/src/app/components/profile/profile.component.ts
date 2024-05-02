import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: any = {};
  currentPassword = '';
  newPassword = '';
  selectedFile = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
  }

  showSnackbar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? ['snack-success'] : ['snack-error'],
    });
  }

  onChangePassword() {
    this.userService
      .changePassword(this.currentPassword, this.newPassword)
      .subscribe({
        next: (response) => {
          console.log('Password changed successfully', response);
          this.currentPassword = '';
          this.newPassword = '';
          this.showSnackbar('Password changed successfully', 'success');
        },
        error: (error) => {
          console.error('Error changing password', error);
          this.currentPassword = '';
          this.newPassword = '';
          this.showSnackbar(
            'Error changing password: ' + error.error.message,
            'error'
          );
        },
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // uploadAvatar(): void {
  //   this.userService.uploadAvatar(this.selectedFile).subscribe(
  //     response => {
  //       console.log('Avatar uploaded successfully');
  //       this.user.avatar = response.avatarPath; // Update the avatar path
  //     },
  //     error => {
  //       console.error('Error uploading avatar', error);
  //     }
  //   );
  // }
}
