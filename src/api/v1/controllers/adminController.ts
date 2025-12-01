// External library imports
import { Request, Response, NextFunction } from "express";

// Internal module imports
import { auth } from "../../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";

const OK: number = 200;

/**
 * Handles setting custom claims for a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const setCustomClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { uid, claims } = req.body;

    try {
        await auth.setCustomUserClaims(uid, claims);
        res.status(OK).json(
            successResponse({}, `Custom claims set for user: ${uid}`)
        );
    } catch (error) {
        next(error);
    }
};