import { AppDataSource } from "../database/data-source.js";
import { User } from "../entities/User.js";

interface IUsuario {
    id: string,
    nome: string,
    email: string,
}

class CreateUserService {
    async execute({ id, nome, email }: IUsuario){
        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create({
            nome,
            email
        })

        await userRepository.save(user);
        return user;
    }
}

export { CreateUserService };