export interface User {
  id: number;
  name: string;
  surname: string;
  age: number;
  email: string;
  role: string;
  address: string;
  postalcode: string;
  phone1: string;
  phone2: string;
  especialidad: string;
  startDate: null;
  isActive: number;
}

export enum UserRole {
  Doctor = "doctor",
  Guest = "guest",
  Admin = "admin",
  Bartender = "bartender",
  Cheff = "cheff",
}
