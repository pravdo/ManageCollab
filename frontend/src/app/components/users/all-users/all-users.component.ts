import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss',
})
export class AllUsersComponent implements OnInit {
  constructor(private userServoce: UserService) {}

  users: User[] = [];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userServoce.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
