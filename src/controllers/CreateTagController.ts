import { Response, Request } from 'express';
import { CreateTagService } from '../services/CreateTagService';

class CreateTagController {
    async handle(request: Request, response: Response) {
        const createTagService = new CreateTagService();
        const { name } = request.body;

        const tag = await createTagService.execute(name);

        return response.json(tag);
    }
}

export {
    CreateTagController
}