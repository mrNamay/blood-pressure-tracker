import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user';

export interface ITokenUser {
  id: string;
  email: string;
  name: string;
}

// Local Strategy for email/password authentication
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        // Authentication successful
        return done(null, { id: user._id.toString(), email: user.email, name: user.name } as ITokenUser, { message: 'Authentication successful.' });
      } catch (error) {
        return done({ message: 'An error occurred during authentication.' });
      }
    }
  )
);

// JWT Strategy for verifying tokens
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your_secret_key', // Replace with a proper secret key
    },
    async (jwtPayload, done) => {
      try {
        return done(null, jwtPayload);
      } catch (error) {
        return done({ message: 'An error occurred while verifying the token.' });
      }
    }
  )
);

export default passport;
