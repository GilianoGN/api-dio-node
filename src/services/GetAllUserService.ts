import { Repository } from "typeorm";
import { User } from "../entities/User.js";

class GetAllUserService {
    constructor(private userRepository: Repository<User>){}
    async execute(){
        const users = await this.userRepository.find();
        return users;
    }
}

export { GetAllUserService }