export interface AuthorizationOptions {
    hasRole: Array<"Admin" | "Manager" | "User">;
    allowSameUser?: boolean;
}