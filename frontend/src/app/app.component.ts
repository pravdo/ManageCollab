import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { HomeComponent } from './components/home/home.component';
import { AuthModule } from './services/auth.module';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/view/navbar/navbar.component';
import { FooterComponent } from './components/view/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    AllUsersComponent,
    HttpClientModule,
    AuthModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'managecollab';
}
