import { AppDataSource } from "../database/data-source.js";
import { DeleteUserService } from "./DeleteUserService.js";
import { User } from "../entities/User.js";
import { describe, expect, it, beforeEach } from '@jest/globals';

describe('DeleteUserService', () => {
    const userRepository = AppDataSource.getRepository(User);
    const deleteUserService = new DeleteUserService(userRepository);
    it('Deve deletar um usuário existente', async () => {
        const user = userRepository.create({
            nome: 'Algum usuário',
            email: 'algum@email.com'
        });
        const savedUser = await userRepository.save(user);
        const result = await deleteUserService.execute(savedUser.id);
        expect(result).toHaveProperty('id', savedUser.id);
        const findUser = await userRepository.findOneBy({ id: savedUser.id });
        expect(findUser).toBeNull();
    });

    it('Deve lançar erro quando o usuário não existe', async () => {
        const idInexistente = 'f3b39794-6e69-42b3-9097-9e76743c683b';
        await expect(deleteUserService.execute(idInexistente))
            .rejects
            .toThrow('Usuário não encontrado');
    });
});