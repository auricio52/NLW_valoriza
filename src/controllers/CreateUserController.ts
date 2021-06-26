import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { getCustomRepository } from 'typeorm';

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, admin, password } = request.body;

        const createUserService = getCustomRepository(CreateUserService);

        const user = createUserService.execute({ name, email, admin, password });

        return response.json(user);
    }
}

export { CreateUserController }

/*
    server -> routes -> Controller -> Service (throw new error)
*/