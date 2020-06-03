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
  Advertisement,
} from '../models';
import {UserRepository} from '../repositories';

export class UserAdvertisementController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/advertisements', {
    responses: {
      '200': {
        description: 'Array of User has many Advertisement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Advertisement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Advertisement>,
  ): Promise<Advertisement[]> {
    return this.userRepository.advertisements(id).find(filter);
  }

  @post('/users/{id}/advertisements', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Advertisement)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advertisement, {
            title: 'NewAdvertisementInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) advertisement: Omit<Advertisement, 'id'>,
  ): Promise<Advertisement> {
    return this.userRepository.advertisements(id).create(advertisement);
  }

  @patch('/users/{id}/advertisements', {
    responses: {
      '200': {
        description: 'User.Advertisement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Advertisement, {partial: true}),
        },
      },
    })
    advertisement: Partial<Advertisement>,
    @param.query.object('where', getWhereSchemaFor(Advertisement)) where?: Where<Advertisement>,
  ): Promise<Count> {
    return this.userRepository.advertisements(id).patch(advertisement, where);
  }

  @del('/users/{id}/advertisements', {
    responses: {
      '200': {
        description: 'User.Advertisement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Advertisement)) where?: Where<Advertisement>,
  ): Promise<Count> {
    return this.userRepository.advertisements(id).delete(where);
  }
}
