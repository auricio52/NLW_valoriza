import { UserRepository } from "../repositories/UsersRepository"
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string,
    email: string,
    password: string
    admin?: boolean // O ?: significa que é um atributo opcional
}

class CreateUserService {
    async execute({ name, email, admin = false, password }: UserRequest) {
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

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        });

        await userRepository.save(user);

        return user;
    }
}

export { CreateUserService }  