import { Request, Response } from 'express';
import BloodPressureService from '../services/bloodPressure';

class BloodPressureController {
    /**
     * Add a new blood pressure reading
     */
    static async addReading(req: Request, res: Response) {
        try {
            const { userId, systolic, diastolic, pulse, notes } = req.body;
            const reading = await BloodPressureService.addReading(userId, systolic, diastolic, pulse, notes);
            res.status(201).json({ message: 'Blood pressure reading added successfully.', reading });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Get all blood pressure readings for a user
     */
    static async getReadingsByUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const startDate = req.query.startDate ? new Date(req.query.startDate.toString()) : undefined;
            const endDate = req.query.endDate ? new Date(req.query.endDate.toString()) : undefined;
            const readings = await BloodPressureService.getReadingsByUser(userId, startDate, endDate);
            res.status(200).json({ message: 'Blood pressure readings retrieved successfully.', readings });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Get a specific blood pressure reading by ID
     */
    static async getReadingById(req: Request, res: Response) {
        try {
            const { readingId } = req.params;
            const reading = await BloodPressureService.getReadingById(readingId);
            if (!reading) {
                res.status(404).json({ message: 'Reading not found.' });
                return
            }
            res.status(200).json({ message: 'Blood pressure reading retrieved successfully.', reading });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Update a blood pressure reading
     */
    static async updateReading(req: Request, res: Response) {
        try {
            const { readingId } = req.params;
            const updateData = req.body;
            const updatedReading = await BloodPressureService.updateReading(readingId, updateData);
            if (!updatedReading) {
                res.status(404).json({ message: 'Reading not found.' });
                return
            }
            res.status(200).json({ message: 'Blood pressure reading updated successfully.', updatedReading });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Delete a blood pressure reading
     */
    static async deleteReading(req: Request, res: Response) {
        try {
            const { readingId } = req.params;
            const deletedReading = await BloodPressureService.deleteReading(readingId);
            if (!deletedReading) {
                res.status(404).json({ message: 'Reading not found.' });
                return
            }
            res.status(200).json({ message: 'Blood pressure reading deleted successfully.', deletedReading });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Get average blood pressure readings for a user
     */
    static async getAverageReadings(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const startDate = req.query.startDate ? new Date(req.query.startDate.toString()) : undefined;
            const endDate = req.query.endDate ? new Date(req.query.endDate.toString()) : undefined;
            const averages = await BloodPressureService.getAverageReadings(userId, startDate, endDate);
            res.status(200).json({ message: 'Average blood pressure readings retrieved successfully.', averages });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default BloodPressureController;
