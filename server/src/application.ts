import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import { AuthenticationComponent, registerAuthenticationStrategy, AuthenticationBindings } from '@loopback/authentication';
import { JWTAuthenticationComponent,MyUserService, SECURITY_SCHEME_SPEC, } from '@loopback/authentication-jwt';
import { DbDataSource } from './datasources';
import { BcryptHasher } from './services/hash.password.bcrypt';
import { MyCustomUserService } from './services/user-service';
import { TokenServiceConstants, TokenServiceBindings, PasswordHasherBindings, UserServiceBindings } from './keys'
import { JWTService } from './services/jwt.service';
import { JWTStrategy } from './strategy/jwtstrategy'
import { UserController } from './controllers';
import { SecurityBindings } from '@loopback/security';

export {ApplicationConfig};

export class ServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    this.component(AuthenticationComponent);
    //registerAuthenticationStrategy(this,JWTStrategy);
    
    this.component(JWTAuthenticationComponent);
    this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyCustomUserService);
    this.setUpBinding();
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
  setUpBinding(): void{
      this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
      this.bind(PasswordHasherBindings.ROUNDS).to(10);
      this.bind(UserServiceBindings.USER_SERVICE).toClass(MyCustomUserService);
      this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
      this.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE);
      this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN);
      
  }
}
