import { Router } from 'express';
import teamRoutes from './teamRoutes';

const router = Router();

router.use('/teams', teamRoutes);

export default router;
