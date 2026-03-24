import { Repository } from "typeorm";
import { User } from "../entities/User.js";

class DeleteUserService {
    constructor(private userRepository: Repository<User>){}
    async execute(id: string) {
        const userExists = await this.userRepository.findOneBy({ id });
        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }
        await this.userRepository.delete(id);
        return userExists;
    }
}

export { DeleteUserService };