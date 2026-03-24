import type { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService.js';

class CreateUserController {
    constructor(private createUserService: CreateUserService){}
    async handle (request: Request, response: Response) {
        const { nome, email } = request.body;
        if(!nome || nome.length ===0){
            return response.status(400).json({mensagem: "Informe o nome"});
        }
        try {
            const user = await this.createUserService.execute({ nome, email});
            return response.status(201).json({user});
        } catch (error: any) {
            return response.status(404).json({mensagem: error.message});
        }
    }
}

export { CreateUserController };