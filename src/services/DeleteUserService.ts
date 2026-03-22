import { AppDataSource } from "../database/data-source.js";
import { User } from "../entities/User.js";

class DeleteUserService {
    async execute(id: string) {
        const userRepository = AppDataSource.getRepository(User);
        const userExists = await userRepository.findOneBy({ id });

        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }

        await userRepository.delete(id);
        return userExists;
    }
}

export { DeleteUserService };