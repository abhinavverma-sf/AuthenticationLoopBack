import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Customer } from './customer.model';

  @model({
    settings: {
      foreignKeys: {
        fk_user_customerId: {
          name: 'fk_user_customerId',
          entity: 'Customer',
          entityKey: 'id',
          foreignKey: 'customerId'
        },
        
      },
    },
  })

export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  middlename: string;

  @property({
    type: 'string',
  })
  lastname?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  role: number;


  @belongsTo(() => Customer)
   customerId: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
