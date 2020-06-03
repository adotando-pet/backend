import {Entity, model, property, belongsTo} from '@loopback/repository';
import {File} from './file.model';

@model({settings: {strict: false}})
export class PetFile extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
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
