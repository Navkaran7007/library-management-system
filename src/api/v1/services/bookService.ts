import { Book } from "../models/bookModel";
import { createDocument, 
  updateDocument, getDocuments, deleteDocument,
   getDocumentById } from "../repositories/firestoreRepository";

export type BookData = Book;

export const createBook = async (
  newBook: Omit<BookData, "id">
): Promise<BookData> => {
  try {
    const newId = await createDocument<BookData>("books", newBook);
    return {
      id: String(newId),
      ...newBook,
    };
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error("Failed to create book");
  }
};

export const getAllBooks = async (): Promise<BookData[]> => {
  const snapshot = await getDocuments("books");
  return snapshot.docs.map((doc: any) => ({
    id: String(doc.id),
    ...(doc.data() as Omit<BookData, "id">),
  }));
};

export const getBookById = async (id: string): Promise<BookData | null> => {
  const doc = await getDocumentById("books", id);

  if (!doc) {
    return null;
  }
  const data = doc.data() as Omit<BookData, "id">;

  return {
    id: doc.id,
    ...data,
  };
};


export const updateBookById = async (
  id: string,
  updateData: Partial<BookData>
): Promise<void> => {
  await updateDocument<BookData>("books", String(id), updateData);
};

export const deleteBookById = async (id: string): Promise<any> => {
  const all = await getAllBooks();
  const book = all.find((b) => b.id === id);

  if (!book) {
    return { ok: false, code: "NOT_FOUND", message: "Book not found" };
  }

  await deleteDocument("books", String(id));

  return { ok: true, data: book, message: "Book deleted" };
};

