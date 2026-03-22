import type { Request, Response } from 'express';
import { UpdateUserService } from '../services/UpdateUserService.js';

class UpdateUserController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;
        const { nome, email } = request.body;

        if (!id) {
            return response.status(400).json({ mensagem: "ID não informado" });
        }

        if (typeof id !== 'string') {
            return response.status(400).json({ mensagem: "ID inválido" });
        }

        const updateUserService = new UpdateUserService();

        try {
            const user = await updateUserService.execute({ id, nome, email });
            return response.status(200).json({ user });
        } catch (error: any) {
            return response.status(404).json({ mensagem: error.message });
        }
    }
}

export { UpdateUserController }