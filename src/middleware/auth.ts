import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
        if (err || !user) {
            return res.status(401).json({ message: err || info?.message || 'Authentication failed' });
        }
        req.user = user;
        next();
    })(req, res, next);
};
