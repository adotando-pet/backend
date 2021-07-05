import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Advertisement} from '../models';
import {AdvertisementRepository} from '../repositories';

export class AdvertisementController {
  constructor(
    @repository(AdvertisementRepository)
    public advertisementRepository : AdvertisementRepository,
  ) {}

  @post('/advertisements', {
    responses: {
      '200': {
        description: 'Advertisement model instance',
        content: {'application/json': {schema: getModelSchemaRef(Advertisement)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advertisement, {
            title: 'NewAdvertisement',
            exclude: ['id'],
          }),
        },
      },
    })
    advertisement: Omit<Advertisement, 'id'>,
  ): Promise<Advertisement> {
    return this.advertisementRepository.create(advertisement);
  }

  @get('/advertisements/count', {
    responses: {
      '200': {
        description: 'Advertisement model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Advertisement) where?: Where<Advertisement>,
  ): Promise<Count> {
    return this.advertisementRepository.count(where);
  }

  @get('/advertisements', {
    responses: {
      '200': {
        description: 'Array of Advertisement model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Advertisement, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Advertisement) filter?: Filter<Advertisement>,
  ): Promise<Advertisement[]> {
    return this.advertisementRepository.find(filter);
  }

  @patch('/advertisements', {
    responses: {
      '200': {
        description: 'Advertisement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advertisement, {partial: true}),
        },
      },
    })
    advertisement: Advertisement,
    @param.where(Advertisement) where?: Where<Advertisement>,
  ): Promise<Count> {
    return this.advertisementRepository.updateAll(advertisement, where);
  }

  @get('/advertisements/{id}', {
    responses: {
      '200': {
        description: 'Advertisement model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Advertisement, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Advertisement, {exclude: 'where'}) filter?: FilterExcludingWhere<Advertisement>
  ): Promise<Advertisement> {
    return this.advertisementRepository.findById(id, filter);
  }

  @patch('/advertisements/{id}', {
    responses: {
      '204': {
        description: 'Advertisement PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advertisement, {partial: true}),
        },
      },
    })
    advertisement: Advertisement,
  ): Promise<void> {
    await this.advertisementRepository.updateById(id, advertisement);
  }

  @put('/advertisements/{id}', {
    responses: {
      '204': {
        description: 'Advertisement PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() advertisement: Advertisement,
  ): Promise<void> {
    await this.advertisementRepository.replaceById(id, advertisement);
  }

  @del('/advertisements/{id}', {
    responses: {
      '204': {
        description: 'Advertisement DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.advertisementRepository.deleteById(id);
  }
}
