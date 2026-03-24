import type { Request, Response } from 'express';
import { GetAllUserService } from '../services/GetAllUserService.js';

class GetAllUserController {
    constructor(private getAllUserService: GetAllUserService){}
    async handle (request: Request, response: Response) {
        const users = await this.getAllUserService.execute();
        return response.status(200).json({users});
    }
}

export { GetAllUserController };