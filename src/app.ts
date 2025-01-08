import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logger
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS

// Routes
app.use('/api', routes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Express TypeScript API!');
});

export default app;
