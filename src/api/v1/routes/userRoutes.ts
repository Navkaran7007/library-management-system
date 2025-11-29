import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController
} from "../controllers/userController";
import { validateBody, validateParams } from "../middleware/validate";
import { idParamSchema } from "../validation/reviewSchemas";
import { createUserSchema } from "../validation/userSchemas";
import authenticate from "../middleware/authenticate";

const router = Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Users retrieved"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get("/users", authenticate,getAllUsersController);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user
 *     responses:
 *       '200':
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User found"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 */
router.get("/users/:id", authenticate,validateParams(idParamSchema),getUserByIdController);

router.post("/users/",   validateBody(createUserSchema),createUserController)
export default router;
