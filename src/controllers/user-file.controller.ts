import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  File,
} from '../models';
import {UserRepository} from '../repositories';

export class UserFileController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/file', {
    responses: {
      '200': {
        description: 'File belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(File)},
          },
        },
      },
    },
  })
  async getFile(
    @param.path.string('id') id: typeof User.prototype.id,
  ): Promise<File> {
    return this.userRepository.avatar(id);
  }
}
