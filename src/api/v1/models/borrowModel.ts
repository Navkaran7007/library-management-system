export interface Borrow {
  id: string;                       
  bookId: string;                    
  userId: string;                     
  status: "BORROWED" | "RETURNED";
  borrowedAt: Date;                   
  returnDate?: Date;           
}
