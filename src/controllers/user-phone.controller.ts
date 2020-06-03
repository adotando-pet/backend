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
  Phone,
} from '../models';
import {UserRepository} from '../repositories';

export class UserPhoneController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/phones', {
    responses: {
      '200': {
        description: 'Array of User has many Phone',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Phone)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Phone>,
  ): Promise<Phone[]> {
    return this.userRepository.phones(id).find(filter);
  }

  @post('/users/{id}/phones', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Phone)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Phone, {
            title: 'NewPhoneInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) phone: Omit<Phone, 'id'>,
  ): Promise<Phone> {
    return this.userRepository.phones(id).create(phone);
  }

  @patch('/users/{id}/phones', {
    responses: {
      '200': {
        description: 'User.Phone PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Phone, {partial: true}),
        },
      },
    })
    phone: Partial<Phone>,
    @param.query.object('where', getWhereSchemaFor(Phone)) where?: Where<Phone>,
  ): Promise<Count> {
    return this.userRepository.phones(id).patch(phone, where);
  }

  @del('/users/{id}/phones', {
    responses: {
      '200': {
        description: 'User.Phone DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Phone)) where?: Where<Phone>,
  ): Promise<Count> {
    return this.userRepository.phones(id).delete(where);
  }
}
