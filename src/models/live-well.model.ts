import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class LiveWell extends Entity {
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
  description: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LiveWell>) {
    super(data);
  }
}

export interface LiveWellRelations {
  // describe navigational properties here
}

export type LiveWellWithRelations = LiveWell & LiveWellRelations;
