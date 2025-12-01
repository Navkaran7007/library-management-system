export interface AuthorizationOptions {
    hasRole: Array<"Admin" | "Librarian" | "User">;
    allowSameUser?: boolean;
}