import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project.model';
import { Task } from '../../../models/task.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  users: User[] = [];
  newTask: Task = {
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
    dueDate: new Date(),
    assignee: '',
    projectId: '',
    storyPoints: 0,
    comments: [],
  };

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe({
        next: (project) => {
          this.project = project;
          console.log('Project data:', project);
          this.newTask.projectId = project._id!;
        },
        error: (err) => {
          console.error('Error fetching project details:', err);
        },
      });
    }
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  createTask(): void {
    if (this.project) {
      this.projectService
        .createTask(this.project._id!, this.newTask)
        .subscribe({
          next: (task) => {
            if (this.project) {
              this.project.tasks = this.project.tasks || [];
              this.project.tasks.push(task);
              this.newTask = {
                title: '',
                description: '',
                status: 'To Do',
                priority: 'Low',
                dueDate: new Date(),
                assignee: '',
                projectId: this.project._id!,
                storyPoints: 0,
                comments: [],
              };
            }
          },
          error: (err) => {
            console.error('Error creating task:', err);
          },
        });
    }
  }

  getMemberNames(): string {
    return this.project?.members.map((member) => member.name).join(', ') || '';
  }
}
