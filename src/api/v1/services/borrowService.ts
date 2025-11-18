import { Borrow } from "../models/borrowModel";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
} from "../repositories/firestoreRepository";

export type BorrowData = Borrow;

/**
 * Get all borrow 
 */
export const getAllBorrowsService = async (): Promise<BorrowData[]> => {
  const snapshot = await getDocuments("borrows");

  return snapshot.docs.map((doc: any) => ({
    id: String(doc.id),
    ...(doc.data() as Omit<BorrowData, "id">),
  }));
};

/**
 * Create a new borrow 
 */
export const borrowBookService = async (
  bookId: string,
  userId: string
): Promise<BorrowData> => {
  const newBorrow: Omit<BorrowData, "id"> = {
    bookId,
    userId,
    status: "BORROWED",
    borrowedAt: new Date(),
  };

  const newId = await createDocument<Omit<BorrowData, "id">>(
    "borrows",
    newBorrow
  );

  return {
    id: String(newId),
    ...newBorrow,
  };
};

/**
 * Return a borrowed book by borrow record id
 */
export const returnBookService = async (
  id: string
): Promise<
  | { ok: true; message: string; data: BorrowData }
  | { ok: false; code: "NOT_FOUND" | "ALREADY_RETURNED"; message: string }
> => {
  const doc = await getDocumentById("borrows", id);

  if (!doc) {
    return { ok: false, code: "NOT_FOUND", message: "Borrow record not found" };
  }

  const data = doc.data() as Omit<BorrowData, "id">;

  const updated: Partial<BorrowData> = {
    status: "RETURNED",
    returnDate: new Date(),
  };

  await updateDocument<Partial<BorrowData>>("borrows", id, updated);

  const result: BorrowData = {
    id: doc.id,
    ...data,
    ...updated,
  };

  return {
    ok: true,
    message: "Book returned successfully",
    data: result,
  };
};
