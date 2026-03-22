import { AppDataSource } from "../database/data-source.js";
import { User } from "../entities/User.js";

class GetAllUserService {
    async execute(){
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        return users;
    }
}

export { GetAllUserService }