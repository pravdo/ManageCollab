import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from '../../services/token.interceptor';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
  }

  onChangePassword() {
    this.userService
      .changePassword(this.currentPassword, this.newPassword)
      .subscribe({
        next: (response) => {
          console.log('Password changed successfully', response);
        },
        error: (error) => {
          console.error('Error changing password', error);
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
