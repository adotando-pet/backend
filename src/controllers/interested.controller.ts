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
import {Interested} from '../models';
import {InterestedRepository} from '../repositories';

export class InterestedController {
  constructor(
    @repository(InterestedRepository)
    public interestedRepository : InterestedRepository,
  ) {}

  @post('/interesteds', {
    responses: {
      '200': {
        description: 'Interested model instance',
        content: {'application/json': {schema: getModelSchemaRef(Interested)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Interested, {
            title: 'NewInterested',
            exclude: ['id'],
          }),
        },
      },
    })
    interested: Omit<Interested, 'id'>,
  ): Promise<Interested> {
    return this.interestedRepository.create(interested);
  }

  @get('/interesteds/count', {
    responses: {
      '200': {
        description: 'Interested model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Interested) where?: Where<Interested>,
  ): Promise<Count> {
    return this.interestedRepository.count(where);
  }

  @get('/interesteds', {
    responses: {
      '200': {
        description: 'Array of Interested model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Interested, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Interested) filter?: Filter<Interested>,
  ): Promise<Interested[]> {
    return this.interestedRepository.find(filter);
  }

  @patch('/interesteds', {
    responses: {
      '200': {
        description: 'Interested PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Interested, {partial: true}),
        },
      },
    })
    interested: Interested,
    @param.where(Interested) where?: Where<Interested>,
  ): Promise<Count> {
    return this.interestedRepository.updateAll(interested, where);
  }

  @get('/interesteds/{id}', {
    responses: {
      '200': {
        description: 'Interested model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Interested, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Interested, {exclude: 'where'}) filter?: FilterExcludingWhere<Interested>
  ): Promise<Interested> {
    return this.interestedRepository.findById(id, filter);
  }

  @patch('/interesteds/{id}', {
    responses: {
      '204': {
        description: 'Interested PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Interested, {partial: true}),
        },
      },
    })
    interested: Interested,
  ): Promise<void> {
    await this.interestedRepository.updateById(id, interested);
  }

  @put('/interesteds/{id}', {
    responses: {
      '204': {
        description: 'Interested PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() interested: Interested,
  ): Promise<void> {
    await this.interestedRepository.replaceById(id, interested);
  }

  @del('/interesteds/{id}', {
    responses: {
      '204': {
        description: 'Interested DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.interestedRepository.deleteById(id);
  }
}
