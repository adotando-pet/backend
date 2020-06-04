import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';
import {Address} from './address.model';
import {Interested} from './interested.model';
import {Pet} from './pet.model';

@model({settings: {strict: false}})
export class Advertisement extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    default: () => uuid(),
  })
  id: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isDisabled?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isVaccinated?: boolean;

  @property({
    type: 'string',
  })
  vaccinatedDescription?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  specialCares?: boolean;

  @property({
    type: 'string',
  })
  specialCaresDescription?: string;

  @belongsTo(() => Pet)
  petId: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @belongsTo(() => Address)
  addressId: string;

  @hasMany(() => Interested)
  interesteds: Interested[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Advertisement>) {
    super(data);
  }
}

export interface AdvertisementRelations {
  // describe navigational properties here
}

export type AdvertisementWithRelations = Advertisement & AdvertisementRelations;
