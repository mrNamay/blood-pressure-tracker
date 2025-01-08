import User, { IUser } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UserService {
  /**
   * Register a new user
   * @param name - User's name
   * @param email - User's email
   * @param password - User's plain text password
   * @returns The created user document
   */
  static async registerUser(name: string, email: string, password: string): Promise<IUser> {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the new user
    const user = new User({
      name,
      email,
      passwordHash,
    });

    // Save the user to the database
    return await user.save();
  }

  /**
   * Authenticate a user by email and password
   * @param email - User's email
   * @param password - User's plain text password
   * @returns A JWT token if authentication is successful
   */
  static async authenticateUser(email: string, password: string): Promise<string> {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password.');
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'your_secret_key', // Replace with a proper secret key
      { expiresIn: '1h' }
    );

    return token;
  }

  /**
   * Get user details by ID
   * @param userId - The ID of the user
   * @returns The user document
   */
  static async getUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  /**
   * Update user details
   * @param userId - The ID of the user
   * @param updateData - The fields to update
   * @returns The updated user document
   */
  static async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  /**
   * Delete a user by ID
   * @param userId - The ID of the user
   * @returns The deleted user document
   */
  static async deleteUser(userId: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(userId);
  }
}
