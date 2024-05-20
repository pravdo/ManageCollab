export interface Task {
  projectId?: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date;
  assignee: string;
  storyPoints: number;
  comments: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
