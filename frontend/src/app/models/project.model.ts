import { Task } from './task.model';
import { User } from './user.model';

export interface Project {
  _id: string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  status: 'Active' | 'Completed' | 'On Hold';
  tasks?: Task[];
  members: User[];
  projectManager: User;
  createdAt?: Date;
  updatedAt?: Date;
}
