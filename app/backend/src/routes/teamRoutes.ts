import { Router } from 'express';
import teamController from '../controller/teamController';

const teamRoutes = Router();

teamRoutes.get('/teams', teamController.getAllTeams);

export default teamRoutes;
