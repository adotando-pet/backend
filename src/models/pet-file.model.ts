import {belongsTo, Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';
import {File} from './file.model';

@model({settings: {strict: false}})
export class PetFile extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    default: () => uuid(),
  })
  id: string;

  @belongsTo(() => File)
  fileId: string;

  @property({
    type: 'string',
  })
  petId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PetFile>) {
    super(data);
  }
}

export interface PetFileRelations {
  // describe navigational properties here
}

export type PetFileWithRelations = PetFile & PetFileRelations;
