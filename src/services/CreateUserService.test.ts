import { AppDataSource } from "../database/data-source.js";
import { CreateUserService } from "./CreateUserService.js";
import { User } from "../entities/User.js";
import { describe, expect, it } from '@jest/globals';

describe('CreateUserService', () => {
    const userRepository = AppDataSource.getRepository(User);
    const createUserService = new CreateUserService(userRepository);
    it ('Deve retornar o id do usuário criado', async () => {
        const result = await createUserService.execute({
            nome: 'Algum usuário',
            email: 'algum@email.com'
        });
        expect(result).toHaveProperty('id');
        expect(result.nome).toBe('Algum usuário');
    });
});