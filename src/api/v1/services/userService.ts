import { User } from "../models/userModel";
import {
  createDocument,
  getDocuments,
  getDocumentById
} from "../repositories/firestoreRepository";

export type UserData = User;

/**
 * Get all users
 */
export const getAllUsersService = async (): Promise<UserData[]> => {
  const snapshot = await getDocuments("users");

  return snapshot.docs.map((doc: any) => ({
    id: String(doc.id),
    ...(doc.data() as Omit<UserData, "id">),
  }));
};

/**
 * Get a user by ID
 */
export const getUserByIdService = async (
  id: string
): Promise<UserData | null> => {
  const doc = await getDocumentById("users", id);

  if (!doc) return null;

  return {
    id: doc.id,
    ...(doc.data() as Omit<UserData, "id">),
  };
};

/**
 * Create a new user
 */
export const createUserService = async (
  data: Omit<UserData, "id">
): Promise<UserData> => {
  const newId = await createDocument<Omit<UserData, "id">>("users", data);

  return {
    id: String(newId),
    ...data,
  };
};
