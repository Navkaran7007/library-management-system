export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number; 
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
