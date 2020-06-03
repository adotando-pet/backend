import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Phone} from './phone.model';
import {Address} from './address.model';
import {Pet} from './pet.model';
import {File} from './file.model';
import {Advertisement} from './advertisement.model';
import {Interested} from './interested.model';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    enum: ['Masculino', 'Feminino', 'Outro'],
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'date',
    required: true,
  })
  birth: string;

  @hasMany(() => Phone)
  phones: Phone[];

  @hasMany(() => Address)
  addresses: Address[];

  @hasMany(() => Pet)
  pets: Pet[];

  @belongsTo(() => File)
  avatarId: string;

  @hasMany(() => Advertisement)
  advertisements: Advertisement[];

  @hasMany(() => Interested)
  interesteds: Interested[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
