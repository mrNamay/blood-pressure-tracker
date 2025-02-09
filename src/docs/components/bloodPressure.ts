/**
 * @swagger
 * components:
 *   schemas:
 *     SystolicReading:
 *       type: number
 *       description: Systolic blood pressure reading
 *       minimum: 50
 *       maximum: 250
 *       
 *     DiastolicReading:
 *       type: number
 *       description: Diastolic blood pressure reading
 *       minimum: 30
 *       maximum: 150
 *     Pulse:
 *       type: number
 *       description: Pulse rate
 *       minimum: 30
 *       maximum: 200
 *     ReadingNotes:
 *       type: string
 *       description: Additional notes for the reading
 *       maxLength: 255
 *       example: "Patient was feeling unwell, took some medication"
 * 
 *     ReadingsAverage:
 *       type: object
 *       properties:
 *         systolic:
 *           type: number
 *         diastolic:
 *           type: number
 *         pulse:
 *           type: number
 *       required:
 *         - systolic
 *         - diastolic
 *         - pulse
 *     BloodPressureReading:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the blood pressure reading
 *         userId:
 *           $ref: '#/components/schemas/UserId'
 *         systolic:
 *           $ref: '#/components/schemas/SystolicReading'
 *         diastolic:
 *           $ref: '#/components/schemas/DiastolicReading'
 *         pulse:
 *           $ref: '#/components/schemas/Pulse'
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the reading
 *         notes:
 *           $ref: '#/components/schemas/ReadingNotes'
 *       required:
 *         - _id
 *         - userId
 *         - systolic
 *         - diastolic
 *         - pulse
 *         - timestamp
 */


