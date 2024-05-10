export interface Project {
  _id: string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  status: 'Active' | 'Completed' | 'On Hold';
  members: string[];
  projectManager: string;
  createdAt?: Date;
  updatedAt?: Date;
}
