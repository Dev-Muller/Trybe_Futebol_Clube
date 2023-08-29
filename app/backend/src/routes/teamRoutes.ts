import { Router } from 'express';
import teamController from '../controller/teamController';

const teamRoutes = Router();

teamRoutes.get('/', teamController.getAllTeams);

teamRoutes.get('/:id', teamController.getOneTeam);

export default teamRoutes;
