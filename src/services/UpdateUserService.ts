import { Repository } from "typeorm";
import { User } from "../entities/User.js";

interface IUserUpdate {
    id: string,
    nome?: string,
    email?: string,
}

class UpdateUserService {
    constructor(private userRepository: Repository<User>){}
    async execute({ id, nome, email }: IUserUpdate) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        user.nome = nome ?? user.nome;
        user.email = email ?? user.email;
        await this.userRepository.save(user);
        return user;
    }
}

export { UpdateUserService };