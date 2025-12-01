export interface User {
  id: string;  
  displayName: string;
  email: string;
  role: "Admin" | "Librarian" | "User";
  createdAt: Date;    
  updatedAt: Date;
}
