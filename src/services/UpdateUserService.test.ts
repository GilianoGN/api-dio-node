import { AppDataSource } from "../database/data-source.js";
import { UpdateUserService } from "./UpdateUserService.js";
import { User } from "../entities/User.js";
import { describe, expect, it, beforeEach } from '@jest/globals';

describe('UpdateUserService', () => {
    const userRepository = AppDataSource.getRepository(User);
    const updateUserService = new UpdateUserService(userRepository);

    it('Deve atualizar o nome e email de um usuário existente', async () => {
        const user = userRepository.create({
            nome: 'Algum usuário',
            email: 'algum@email.com'
        });
        const savedUser = await userRepository.save(user);
        const result = await updateUserService.execute({
            id: savedUser.id,
            nome: 'Outro usuário',
            email: 'outro@email.com'
        });
        expect(result.nome).toBe('Outro usuário');
        expect(result.email).toBe('outro@email.com');
        expect(result.id).toBe(savedUser.id);
    });

    it('Deve atualizar apenas o nome se o email não for enviado', async () => {
        const user = userRepository.create({
            nome: 'Algum usuário',
            email: 'algum@email.com'
        });
        const savedUser = await userRepository.save(user);

        const result = await updateUserService.execute({
            id: savedUser.id,
            nome: 'Outro usuário'
        });
        expect(result.nome).toBe('Outro usuário');
        expect(result.email).toBe('algum@email.com');
        expect(result.id).toBe(savedUser.id);
    });

    it('Deve lançar erro ao tentar atualizar usuário inexistente', async () => {
        await expect(updateUserService.execute({
            id: 'f3b39794-6e69-42b3-9097-9e76743c683b',
            nome: 'Outro usuário',
            email: 'outro@email.com'
        }))
            .rejects
            .toThrow('Usuário não encontrado');
    });
});