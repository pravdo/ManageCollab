import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './schema/projects.schema';
import { Task } from 'src/tasks/schema/tasks.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Post(':id/tasks')
  async createTask(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.projectsService.addTask(id, task);
  }

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
