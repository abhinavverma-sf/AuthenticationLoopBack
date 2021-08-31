import { BindingKey } from "@loopback/core"
import { JWTService } from "./services/jwt.service"
import { UserService, TokenService } from '@loopback/authentication'
import { PasswordHasher } from "./services/hash.password.bcrypt"
import { MyCustomUserService} from "./services/user-service"


export namespace TokenServiceConstants{
    export const TOKEN_SECRET_VALUE='4231sdfj238'
    export const TOKEN_EXPIRES_IN='7h'
}

export namespace TokenServiceBindings{
    export const TOKEN_SECRET=BindingKey.create<string>('authentication.jwt.secret')
    export const TOKEN_EXPIRES_IN=BindingKey.create<string>('authentication.jwt.expiresIn')
    export const TOKEN_SERVICE=BindingKey.create<JWTService>('services.jwt.service')

}

export namespace PasswordHasherBindings{
    export const PASSWORD_HASHER=BindingKey.create<PasswordHasher>('service.hasher')
    export const ROUNDS=BindingKey.create<number>('rounds')
}

export namespace UserServiceBindings{
    export const USER_SERVICE=BindingKey.create<MyCustomUserService>('services.user.service')
    export const DATASOURCE_NAME = 'jwtdb';

    
}