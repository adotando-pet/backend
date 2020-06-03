import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Phone extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  number: number;

  @property({
    type: 'string',
    required: true,
    enum: ['Residência', 'Trabalho', 'Celular', 'Contato']
  })
  type: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isWhatsapp?: boolean;

  @property({
    type: 'string',
  })
  userId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Phone>) {
    super(data);
  }
}

export interface PhoneRelations {
  // describe navigational properties here
}

export type PhoneWithRelations = Phone & PhoneRelations;
