import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from './schema/projects.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { Task, TaskDocument } from 'src/tasks/schema/tasks.schema';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = new this.projectModel(createProjectDto);
    return newProject.save();
  }

  async findAll(): Promise<Project[]> {
    return await this.projectModel.find().populate('tasks').exec();
  }

  async findOne(id: string): Promise<Project> {
    return this.projectModel
      .findById(id)
      .populate('projectManager', 'name email') // Populate project manager with only name
      .populate('members', 'name email')
      .populate('tasks')
      .exec();
  }

  async createTask(
    projectId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const project = await this.projectModel.findById(projectId).exec();
    if (project) {
      // Convert projectId to ObjectId
      const taskData = {
        ...createTaskDto,
        projectId: new Types.ObjectId(createTaskDto.projectId),
      };
      const createdTask = new this.taskModel(taskData);
      const savedTask = await createdTask.save();

      project.tasks = project.tasks || [];
      project.tasks.push(savedTask._id);
      await project.save();

      return savedTask;
    }
    throw new Error('Project not found');
  }

  async remove(id: string): Promise<Project> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}
