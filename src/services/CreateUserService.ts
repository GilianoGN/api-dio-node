import { Repository } from "typeorm";
import { User } from "../entities/User.js";

interface IUsuario {
    nome: string,
    email: string,
}

class CreateUserService {
    constructor(private userRepository: Repository<User>){}
    async execute({ nome, email }: IUsuario){
        const user = await this.userRepository.create({
            nome,
            email
        })
        await this.userRepository.save(user);
        return user;
    }
}

export { CreateUserService };