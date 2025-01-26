/**
 * @swagger
 * components:
 *   schemas:
 *     UserId:
 *       type: string
 *       description: The ID of the user
 *       format: uuid
 *       example: "507f1f77bcf86cd799439011"
 *     Name:
 *       type: string
 *       description: The name of the user
 *       maxLength: 255
 *       example: "John Doe"
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           $ref: '#/components/schemas/UserId'
 *         name:
 *           $ref: '#/components/schemas/Name'
 *         email:
 *           $ref: '#/components/schemas/Email'
 *       required:
 *         - _id
 *         - name
 *         - email
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         name: "John Doe"
 *         email: "john.doe@example.com"
 */
