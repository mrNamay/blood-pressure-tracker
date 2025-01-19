import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user';
import { IUser } from '../models/user';

class AuthController {
    /**
     * Register a new user
     */
    static async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const user = await UserService.registerUser(name, email, password);
            res.status(201).json({ message: 'User registered successfully.', user });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Login and generate a JWT token
     */
    static async login(req: Request, res: Response) {
        try {
            const user = req.user as IUser;

            // Generate a JWT token
            const token = jwt.sign(
                { id: user._id, email: user.email, name: user.name },
                process.env.JWT_SECRET || 'your_secret_key',
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Login successful.', token, userId: user._id });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Get my profile.
     */
    static async getMyProfile(req: Request, res: Response) {
        try {
            const user = req.user as IUser;
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default AuthController;
