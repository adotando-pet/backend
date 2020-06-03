import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PetFile,
  File,
} from '../models';
import {PetFileRepository} from '../repositories';

export class PetFileFileController {
  constructor(
    @repository(PetFileRepository)
    public petFileRepository: PetFileRepository,
  ) { }

  @get('/pet-files/{id}/file', {
    responses: {
      '200': {
        description: 'File belonging to PetFile',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(File)},
          },
        },
      },
    },
  })
  async getFile(
    @param.path.string('id') id: typeof PetFile.prototype.id,
  ): Promise<File> {
    return this.petFileRepository.file(id);
  }
}
