import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UsersRepository"
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";

interface AuthenticateRequest {
    email: string,
    password: string
} 

class AuthenticateUserService {
    async execute({ email, password }: AuthenticateRequest) {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);


        if (!passwordMatch) {
            throw new Error("Email/password incorrect!");
        }
        
        const token = sign({
            id: user.id,
            email: user.email
        }, "0aa22e2fce3d60e35b31bc980a330fcd", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}   

export { AuthenticateUserService }