import { Router } from 'express';
//import type { Request, Response } from 'express';
import { CreateUserController } from './controllers/CreateUserController.js';
import { GetAllUserController } from './controllers/GetAllUserController.js';
import { DeleteUserController } from './controllers/DeleteUserController.js';
import { UpdateUserController } from './controllers/UpdateUserController.js';


const router = Router();
const createUserController = new CreateUserController();
const getAllUserController = new GetAllUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();

router.post('/usuarios', (req, res) => createUserController.handle(req, res));
router.get('/usuarios', (req, res) => getAllUserController.handle(req, res));
router.delete('/usuarios/:id', (req, res) => deleteUserController.handle(req, res));
router.put('/usuarios/:id', (req, res) => updateUserController.handle(req, res));

export { router };