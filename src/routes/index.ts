import { Router } from 'express';
import authRouter from './auth';
import bloodPressureRouter from './bloodPressure';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/blood-pressure', bloodPressureRouter);

export default apiRouter;
