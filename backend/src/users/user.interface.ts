export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  toObject(): any; // Define this if you expect a Mongoose document
}
