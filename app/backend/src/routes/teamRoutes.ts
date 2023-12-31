import { Router } from 'express';
import teamController from '../controller/teamController';

const teamRoutes = Router();

teamRoutes.get('/teams', teamController.getAllTeams);

teamRoutes.get('/teams/:id', teamController.getOneTeam);

export default teamRoutes;
