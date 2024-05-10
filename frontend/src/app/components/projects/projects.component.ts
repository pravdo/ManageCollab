import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => (this.projects = projects),
      error: (err) => console.error('Error loading project', err),
    });
  }

  goToProject(projectId: string): void {
    this.router.navigate(['/project', projectId]);
  }
}
