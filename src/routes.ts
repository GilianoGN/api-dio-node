import { Router } from 'express';
import { User } from './entities/User.js';
import { AppDataSource } from './database/data-source.js';
// Importação dos Controller
import { CreateUserController } from './controllers/CreateUserController.js';
import { GetAllUserController } from './controllers/GetAllUserController.js';
import { DeleteUserController } from './controllers/DeleteUserController.js';
import { UpdateUserController } from './controllers/UpdateUserController.js';
// Importação dos Services
import { CreateUserService } from './services/CreateUserService.js';
import { GetAllUserService } from './services/GetAllUserService.js';
import { DeleteUserService } from './services/DeleteUserService.js';
import { UpdateUserService } from './services/UpdateUserService.js';

const router = Router();

const userRepository = AppDataSource.getRepository(User);

const createUserService = new CreateUserService(userRepository);
const getAllUserService = new GetAllUserService(userRepository);
const deleteUserService = new DeleteUserService(userRepository);
const updateUserService = new UpdateUserService(userRepository);

const createUserController = new CreateUserController(createUserService);
const getAllUserController = new GetAllUserController(getAllUserService);
const deleteUserController = new DeleteUserController(deleteUserService);
const updateUserController = new UpdateUserController(updateUserService);

router.post('/usuarios', (req, res) => createUserController.handle(req, res));
router.get('/usuarios', (req, res) => getAllUserController.handle(req, res));
router.delete('/usuarios/:id', (req, res) => deleteUserController.handle(req, res));
router.put('/usuarios/:id', (req, res) => updateUserController.handle(req, res));

export { router };