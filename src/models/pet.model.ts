import {Entity, model, property, hasMany} from '@loopback/repository';
import {PetFile} from './pet-file.model';

@model({settings: {strict: false}})
export class Pet extends Entity {
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
    enum: ['Macho', 'Fêmea'],
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    enum: ['sm', 'md', 'bg'],
    required: true,
  })
  size: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isCastrated?: boolean;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'string',
    enum: ['Gato', 'Cachorro', 'Outros'],
    required: true,
  })
  type: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @hasMany(() => PetFile)
  files: PetFile[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pet>) {
    super(data);
  }
}

export interface PetRelations {
  // describe navigational properties here
}

export type PetWithRelations = Pet & PetRelations;
