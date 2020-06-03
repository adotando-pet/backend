import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Temperament extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Temperament>) {
    super(data);
  }
}

export interface TemperamentRelations {
  // describe navigational properties here
}

export type TemperamentWithRelations = Temperament & TemperamentRelations;
