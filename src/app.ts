import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger';

import passport from "./config/passport"
import apiRouter from './routes';

const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logger
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(passport.initialize());

// Swagger Setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', apiRouter);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Express TypeScript API!');
});

export default app;
