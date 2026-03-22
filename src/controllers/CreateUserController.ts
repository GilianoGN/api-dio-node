import type { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService.js';


class CreateUserController {
    async handle (request: Request, response: Response) {
        const createUserService = new CreateUserService();

        const {id, nome, email } = request.body;

        if(!nome || nome.length ===0){
            return response.status(400).json({mensagem: "Informe o nome"});
        }

        const user = await createUserService.execute({id, nome, email});

        return response.status(201).json({user});
    }
}

export { CreateUserController };