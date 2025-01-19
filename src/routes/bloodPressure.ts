import { Router } from 'express';
import BloodPressureController from '../controllers/bloodPressure';
import { authenticateJwt } from '../middleware/auth';

const bloodPressureRouter = Router();

/**
 * @swagger
 * /api/blood-pressure:
 *   post:
 *     summary: Add a new blood pressure reading
 *     tags: [Blood Pressure]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               systolic:
 *                 type: number
 *               diastolic:
 *                 type: number
 *               pulse:
 *                 type: number
 *               notes:
 *                 type: string
 *             required: [userId, systolic, diastolic, pulse]
 *     responses:
 *       201:
 *         description: Blood pressure reading added successfully
 *       400:
 *         description: Bad request
 */
bloodPressureRouter.post('/', authenticateJwt, BloodPressureController.addReading);

/**
 * @swagger
 * /api/blood-pressure/{userId}:
 *   get:
 *     summary: Get all blood pressure readings for a user
 *     tags: [Blood Pressure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for the blood pressure reading.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for the blood pressure reading.
 *     responses:
 *       200:
 *         description: Blood pressure readings retrieved successfully
 *       500:
 *         description: Server error
 */
bloodPressureRouter.get('/:userId', authenticateJwt, BloodPressureController.getReadingsByUser);

/**
 * @swagger
 * /api/blood-pressure/reading/{readingId}:
 *   get:
 *     summary: Get a specific blood pressure reading by ID
 *     tags: [Blood Pressure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: readingId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the reading
 *     responses:
 *       200:
 *         description: Blood pressure reading retrieved successfully
 *       404:
 *         description: Reading not found
 */
bloodPressureRouter.get('/reading/:readingId', authenticateJwt, BloodPressureController.getReadingById);

/**
 * @swagger
 * /api/blood-pressure/reading/{readingId}:
 *   put:
 *     summary: Update a blood pressure reading
 *     tags: [Blood Pressure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: readingId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the reading
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               systolic:
 *                 type: number
 *               diastolic:
 *                 type: number
 *               pulse:
 *                 type: number
 *     responses:
 *       200:
 *         description: Blood pressure reading updated successfully
 *       404:
 *         description: Reading not found
 */
bloodPressureRouter.put('/reading/:readingId', authenticateJwt, BloodPressureController.updateReading);

/**
 * @swagger
 * /api/blood-pressure/reading/{readingId}:
 *   delete:
 *     summary: Delete a blood pressure reading
 *     tags: [Blood Pressure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: readingId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the reading
 *     responses:
 *       200:
 *         description: Blood pressure reading deleted successfully
 *       404:
 *         description: Reading not found
 */
bloodPressureRouter.delete('/reading/:readingId', authenticateJwt, BloodPressureController.deleteReading);

/**
 * @swagger
 * /api/blood-pressure/{userId}/averages:
 *   get:
 *     summary: Get average blood pressure readings for a user
 *     tags: [Blood Pressure]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for the average calculation
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for the average calculation
 *     responses:
 *       200:
 *         description: Average blood pressure readings retrieved successfully
 *       500:
 *         description: Server error
 */
bloodPressureRouter.get('/:userId/averages', authenticateJwt, BloodPressureController.getAverageReadings);

export default bloodPressureRouter;
