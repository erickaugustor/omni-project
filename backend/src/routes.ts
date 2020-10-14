import { Router } from 'express';
import multer from 'multer';

import updloadConfig from './config/updload';
import OrphanageController from './controller/OrphanagesController';

const routes = Router();
const updload = multer(updloadConfig);

routes.get('/orphanages', OrphanageController.index);
routes.get('/orphanages/:id', OrphanageController.show);

routes.post('/orphanages', updload.array('images'), OrphanageController.create);

export default routes;
