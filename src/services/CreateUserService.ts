import { UserRepository } from "../repositories/UsersRepository"

interface UserRequest {
    name: string,
    email: string,
    admin?: boolean // O ?: significa que é um atributo opcional
}

class CreateUserService {
    async execute({ name, email, admin }: UserRequest) {
        const userRepository = new UserRepository();

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        } 

        const user = userRepository.create({
            name,
            email,
            admin
        });

        await userRepository.save(user);

        return user;
    }
}

export { CreateUserService }  