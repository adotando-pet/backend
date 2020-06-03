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
  User,
  Interested,
} from '../models';
import {UserRepository} from '../repositories';

export class UserInterestedController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/interesteds', {
    responses: {
      '200': {
        description: 'Array of User has many Interested',
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
    return this.userRepository.interesteds(id).find(filter);
  }

  @post('/users/{id}/interesteds', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Interested)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Interested, {
            title: 'NewInterestedInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) interested: Omit<Interested, 'id'>,
  ): Promise<Interested> {
    return this.userRepository.interesteds(id).create(interested);
  }

  @patch('/users/{id}/interesteds', {
    responses: {
      '200': {
        description: 'User.Interested PATCH success count',
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
    return this.userRepository.interesteds(id).patch(interested, where);
  }

  @del('/users/{id}/interesteds', {
    responses: {
      '200': {
        description: 'User.Interested DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Interested)) where?: Where<Interested>,
  ): Promise<Count> {
    return this.userRepository.interesteds(id).delete(where);
  }
}
