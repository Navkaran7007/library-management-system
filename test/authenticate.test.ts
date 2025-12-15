import { Request, Response, NextFunction } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";

// Mock Firebase auth
jest.mock("../config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

describe("authenticate middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            locals: {},
        };
        nextFunction = jest.fn();
    });

    it("should pass AuthenticationError to next() when no token is provided", async () => {
        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );
        const error = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Unauthorized: No token provided");
        expect(error.code).toBe("TOKEN_NOT_FOUND");
        expect(error.statusCode).toBe(401);
    });

    it("should pass AuthenticationError to next() when token verification fails", async () => {
        // Arrange
        mockRequest.headers = {
            authorization: "Bearer invalid-token",
        };

        (auth.verifyIdToken as jest.Mock).mockRejectedValueOnce(
            new Error("Invalid token")
        );

        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );
    });

    it("should call next() and set user data when token is valid", async () => {
        // Arrange
        mockRequest.headers = {
            authorization: "Bearer valid-token",
        };

        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "test-uid",
            role: "admin",
        });

        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(auth.verifyIdToken).toHaveBeenCalledWith("valid-token");
        expect(mockResponse.locals).toEqual({
            uid: "test-uid",
            role: "admin",
        });

        // Called without error
        expect(nextFunction).toHaveBeenCalledWith();
    });

    it("should handle malformed authorization header", async () => {
        // Arrange
        // Missing "Bearer " prefix
        mockRequest.headers = {
            authorization: "InvalidFormat",
        };

        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );
        const error = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Unauthorized: No token provided");
    });
});