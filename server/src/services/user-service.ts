
import { Credentials,UserRepository} from '../repositories/user.repository'
import { User} from '../models'
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { inject } from '@loopback/core';
import { BcryptHasher } from './hash.password.bcrypt';
import { securityId, UserProfile } from '@loopback/security';
import { UserServiceBindings, PasswordHasherBindings, TokenServiceBindings } from '../keys';



export class MyCustomUserService {

        constructor(
            @repository(UserRepository)
            public userRepository: UserRepository,
            @inject(PasswordHasherBindings.PASSWORD_HASHER)
            public hasher: BcryptHasher

        ){

        }
        async verifyPassword(credentials: Credentials): Promise<User> {
            console.log(credentials);
            const foundUser: User| null=await this.userRepository.findOne({
                where: {
                    email: credentials.email
                }
            });

            if(!foundUser){
                throw new HttpErrors.NotFound('email does not exist');
            }
            const passwordMatched=await this.hasher.comparePassword(
                credentials.password,
                foundUser.password
            );
            if(!passwordMatched){
                throw new HttpErrors.Unauthorized('Password incorrect');
            }
            return foundUser;
        }
        convertToUserProfile(user: User): UserProfile{
            return {
                [securityId]: user.id!.toString(),
                email: user.email,
                name: user.firstname,
                id: user.id,


            
            }

        }

}