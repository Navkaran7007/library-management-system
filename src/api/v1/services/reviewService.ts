import { Review } from "../models/reviewModel";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";
/**
 * Create a new review.
 */
export const createReviewService = async (
  data: Omit<Review, "id">
): Promise<Review> => {
  if (data.rating < 1 || data.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const id = await createDocument("reviews", data);

  return { id: String(id), ...data };
};

/**
 * Get all reviews for a specific book.
 */
export const getBookReviewsService = async (
  bookId: string
): Promise<Review[]> => {
  const snapshot = await getDocuments("reviews");

  return snapshot.docs
    .map((doc: any) => ({
      id: doc.id,
      ...(doc.data() as Omit<Review, "id">),
    }))
    .filter((review) => review.bookId === bookId);
};
/**
 * Update a review by ID.
 */
export const updateReviewService = async (
  id: string,
  updateData: Partial<Review>
): Promise<Review | null> => {
  const doc = await getDocumentById("reviews", id);
  if (!doc) return null;

  if (
    updateData.rating !== undefined &&
    (updateData.rating < 1 || updateData.rating > 5)
  ) {
    throw new Error("Rating must be between 1 and 5");
  }

  await updateDocument("reviews", id, {
    ...updateData,
    updatedAt: new Date(),
  });

  return {
    id,
    ...(doc.data() as Omit<Review, "id">),
    ...updateData,
  };
};
/**
 * Delete a review by ID.
 */
export const deleteReviewService = async (id: string): Promise<boolean> => {
  const doc = await getDocumentById("reviews", id);
  if (!doc) return false;

  await deleteDocument("reviews", id);
  return true;
};
