import { Router } from 'express';
import passport from 'passport';
import AuthController from '../controllers/auth';
import { authenticateJwt } from '../middleware/auth';

const authRouter = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 $ref: '#/components/schemas/Email'
 *               password:
 *                 $ref: '#/components/schemas/Password'
 *             required: [name, email, password]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
authRouter.post('/register', AuthController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user and get a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 $ref: '#/components/schemas/Email'
 *               password:
 *                 $ref: '#/components/schemas/Password'
 *             required: [email, password]
 *     responses:
 *       200:
 *         description: Successfully logged in, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userId:
 *                   $ref: '#/components/schemas/UserId'
 *       401:
 *         description: Unauthorized
 */
authRouter.post('/login', passport.authenticate('local', { session: false }), AuthController.login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get the profile of the authenticated user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (Invalid or expired token)
 */
authRouter.get('/profile', authenticateJwt, AuthController.getMyProfile);

export default authRouter;
