/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           $ref: '#/components/schemas/Email'
 *       required:
 *         - _id
 *         - name
 *         - email
 *       example:
 *         _id: "1234567890"
 *         name: "John Doe"
 *         email: "john.doe@example.com"
 */
