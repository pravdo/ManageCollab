export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  avatar?: string;
  contactInfo?: {
    phone?: string;
    address?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
