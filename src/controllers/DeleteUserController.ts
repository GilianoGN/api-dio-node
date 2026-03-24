import type { Request, Response } from 'express';
import { DeleteUserService } from '../services/DeleteUserService.js';

class DeleteUserController {
    constructor(private deleteUserService: DeleteUserService){}
    async handle (request: Request, response: Response) {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({ mensagem: "ID não informado" });
        }
        if (typeof id !== 'string') {
            return response.status(400).json({ mensagem: "ID inválido" });
        }
        try {
            await this.deleteUserService.execute(id);
            return response.status(204).send();
        } catch (error: any) {
            return response.status(404).json({ mensagem: error.message });
        }
    }
}

export { DeleteUserController };