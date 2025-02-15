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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
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
 *               required: [token, userId]
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
authRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
        if (err) {
            return res.status(400).send({ message: 'error' });
        }
        if (!user) {
            return res.status(401).send({ message: info?.message || 'error' });
        }
        req.user = user;
        return next();
    })(req, res, next);
}, AuthController.login);

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
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
authRouter.get('/profile', authenticateJwt, AuthController.getMyProfile);

export default authRouter;
