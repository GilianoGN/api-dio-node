import { AppDataSource } from "../database/data-source.js";
import { User } from "../entities/User.js";

interface IUserUpdate {
    id: string,
    nome?: string,
    email?: string,
}

class UpdateUserService {
    async execute({ id, nome, email }: IUserUpdate) {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        user.nome = nome ?? user.nome;
        user.email = email ?? user.email;

        await userRepository.save(user);

        return user;
    }
}

export { UpdateUserService };