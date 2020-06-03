import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Advertisement,
  Interested,
} from '../models';
import {AdvertisementRepository} from '../repositories';

export class AdvertisementInterestedController {
  constructor(
    @repository(AdvertisementRepository) protected advertisementRepository: AdvertisementRepository,
  ) { }

  @get('/advertisements/{id}/interesteds', {
    responses: {
      '200': {
        description: 'Array of Advertisement has many Interested',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Interested)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Interested>,
  ): Promise<Interested[]> {
    return this.advertisementRepository.interesteds(id).find(filter);
  }

  @post('/advertisements/{id}/interesteds', {
    responses: {
      '200': {
        description: 'Advertisement model instance',
        content: {'application/json': {schema: getModelSchemaRef(Interested)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Advertisement.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Interested, {
            title: 'NewInterestedInAdvertisement',
            exclude: ['id'],
            optional: ['advertisementId']
          }),
        },
      },
    }) interested: Omit<Interested, 'id'>,
  ): Promise<Interested> {
    return this.advertisementRepository.interesteds(id).create(interested);
  }

  @patch('/advertisements/{id}/interesteds', {
    responses: {
      '200': {
        description: 'Advertisement.Interested PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Interested, {partial: true}),
        },
      },
    })
    interested: Partial<Interested>,
    @param.query.object('where', getWhereSchemaFor(Interested)) where?: Where<Interested>,
  ): Promise<Count> {
    return this.advertisementRepository.interesteds(id).patch(interested, where);
  }

  @del('/advertisements/{id}/interesteds', {
    responses: {
      '200': {
        description: 'Advertisement.Interested DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Interested)) where?: Where<Interested>,
  ): Promise<Count> {
    return this.advertisementRepository.interesteds(id).delete(where);
  }
}
