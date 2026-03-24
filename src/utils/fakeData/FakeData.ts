import { CreateUserService } from "../../services/CreateUserService.js";
import { Repository } from "typeorm";
import { User } from "../../entities/User.js";

class FakeData {
    private createUserService: CreateUserService;
    constructor(private userRepository: Repository<User>){
        this.createUserService = new CreateUserService(userRepository);
    }

    async execute() {
        await this.createUserService.execute({
            nome: 'Algum usuário',
            email: 'algum@email.com',
        });
        await this.createUserService.execute({
            nome: 'Outro usuário',
            email: 'outro@email.com',
        });
        await this.createUserService.execute({
            nome: 'Mais outro usuário',
            email: 'mais@email.com',
        });
    }
}

export { FakeData };