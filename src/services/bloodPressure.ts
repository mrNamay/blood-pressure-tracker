import mongoose from 'mongoose';
import BloodPressureReading, { IBloodPressureReading } from '../models/bloodPressureReading';

export default class BloodPressureService {
  /**
   * Add a new blood pressure reading for a user
   * @param userId - The ID of the user
   * @param systolic - Systolic blood pressure reading
   * @param diastolic - Diastolic blood pressure reading
   * @param pulse - Pulse rate
   * @returns The created blood pressure reading document
   */
  static async addReading(
    userId: string,
    systolic: number,
    diastolic: number,
    pulse: number
  ): Promise<IBloodPressureReading> {
    const reading = new BloodPressureReading({
      userId,
      systolic,
      diastolic,
      pulse,
    });

    return await reading.save();
  }

  /**
   * Get all blood pressure readings for a user with pagination
   * @param userId - The ID of the user
   * @param page - The page number (default: 1)
   * @param limit - The number of readings per page (default: 10)
   * @returns An object containing the readings and pagination details
   */
  static async getReadingsByUser(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ readings: IBloodPressureReading[]; total: number; totalPages: number; currentPage: number }> {
    const skip = (page - 1) * limit;

    const [readings, total] = await Promise.all([
      BloodPressureReading.find({ userId }).sort({ timestamp: -1 }).skip(skip).limit(limit),
      BloodPressureReading.countDocuments({ userId }),
    ]);

    return {
      readings,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  /**
   * Get a single blood pressure reading by ID
   * @param readingId - The ID of the reading
   * @returns The blood pressure reading document
   */
  static async getReadingById(readingId: string): Promise<IBloodPressureReading | null> {
    return await BloodPressureReading.findById(readingId);
  }

  /**
   * Update a blood pressure reading
   * @param readingId - The ID of the reading
   * @param updateData - The fields to update
   * @returns The updated blood pressure reading document
   */
  static async updateReading(
    readingId: string,
    updateData: Partial<IBloodPressureReading>
  ): Promise<IBloodPressureReading | null> {
    return await BloodPressureReading.findByIdAndUpdate(readingId, updateData, { new: true });
  }

  /**
   * Delete a blood pressure reading by ID
   * @param readingId - The ID of the reading
   * @returns The deleted blood pressure reading document
   */
  static async deleteReading(readingId: string): Promise<IBloodPressureReading | null> {
    return await BloodPressureReading.findByIdAndDelete(readingId);
  }

  /**
   * Get average blood pressure readings for a user within a date range
   * @param userId - The ID of the user
   * @param startDate - The start of the date range (optional)
   * @param endDate - The end of the date range (optional)
   * @returns An object containing the average systolic, diastolic, and pulse readings
   */
  static async getAverageReadings(
    userId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<{
    systolic: number;
    diastolic: number;
    pulse: number;
  }> {
    const matchFilter: any = { userId: new mongoose.Types.ObjectId(userId) };

    if (startDate) matchFilter.timestamp = { $gte: startDate };
    if (endDate) matchFilter.timestamp = { ...(matchFilter.timestamp || {}), $lte: endDate };

    const results = await BloodPressureReading.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: null,
          avgSystolic: { $avg: '$systolic' },
          avgDiastolic: { $avg: '$diastolic' },
          avgPulse: { $avg: '$pulse' },
        },
      },
    ]);

    if (results.length === 0) {
      return { systolic: 0, diastolic: 0, pulse: 0 };
    }

    const { avgSystolic, avgDiastolic, avgPulse } = results[0];
    return { systolic: avgSystolic, diastolic: avgDiastolic, pulse: avgPulse };
  }
}
