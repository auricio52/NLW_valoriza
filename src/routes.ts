import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { ensuteAdmin } from './middlewares/EnsureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.get('/', (request, response) => {
    return response.send('Funcionando');
});
router.post('/users', createUserController.handle);

router.post('/tags', ensuteAdmin, createTagController.handle);

export { router }