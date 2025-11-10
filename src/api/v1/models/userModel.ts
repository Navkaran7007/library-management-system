export interface User {
  id: string;  
  displayName: string;
  email: string;
  role: "ADMIN" | "LIBRARIAN" | "MEMBER";
  createdAt: Date;    
  updatedAt: Date;
}
