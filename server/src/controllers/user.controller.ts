import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  getJsonSchemaRef
} from '@loopback/rest';
import {inject} from '@loopback/core';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {validateCredentials} from '../services/validator';
import * as _ from 'lodash';
import {BcryptHasher} from '../services/hash.password.bcrypt';
import {CredentialsRequestBody} from './specs/user.controller.spec';
import {MyCustomUserService} from '../services/user-service';
import {JWTService} from '@loopback/authentication-jwt';
import {
  UserServiceBindings,
  PasswordHasherBindings,
  TokenServiceBindings,
} from '../keys';
import {authenticate, AuthenticationBindings} from 'loopback4-authentication';
import { SecurityBindings } from '@loopback/security';
import {securityId, UserProfile} from '@loopback/security';
export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyCustomUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
    @inject(SecurityBindings.USER, {optional: true})
    public currentUserji: UserProfile
  ) {}

  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async signUp(@requestBody() userData: User) {
    validateCredentials(_.pick(userData, ['email', 'password']));
    //encrypt password
    userData.password = await this.hasher.hashPassword(userData.password);
    const savedUser = await this.userRepository.create(userData);
    // delete savedUser.password; - doesn't work because savedUser is of type user and user has passowrd as required
    const userValuesToReturn = {
      id: savedUser.id,
      firstName: savedUser.firstname,
      middleName: savedUser.middlename,
      lastName: savedUser.lastname,
      phoneNumber: savedUser.phone,
      email: savedUser.email,
      customerId: savedUser.customerId,
      roleId: savedUser.role,
    };
    return userValuesToReturn;
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    const user = await this.userService.verifyPassword(credentials);
    console.log('user is', user);
    const userProfile = this.userService.convertToUserProfile(user);

    const generatedtoken = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({
      token: generatedtoken,
    });
  }

/*  @get('/users/me')
  @response(200,{
    description: 'the current user profile',
    content: {
      'application/json': {
        schema: getJsonSchemaRef(User),
      },
    },

  })
  @authenticate('jwt')
  async me(
    @inject(SecurityBindings.USER)
    currentUser: UserProfile,
  ): Promise<string> {
    console.log(currentUser);
    return currentUser[securityId];
  }*/

  @post('/user')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userRepository.create(user);
  }

  @get('/user/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/user')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/user')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/user/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/user/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/user/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/user/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
