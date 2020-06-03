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
  Pet,
  PetFile,
} from '../models';
import {PetRepository} from '../repositories';

export class PetPetFileController {
  constructor(
    @repository(PetRepository) protected petRepository: PetRepository,
  ) { }

  @get('/pets/{id}/pet-files', {
    responses: {
      '200': {
        description: 'Array of Pet has many PetFile',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PetFile)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PetFile>,
  ): Promise<PetFile[]> {
    return this.petRepository.files(id).find(filter);
  }

  @post('/pets/{id}/pet-files', {
    responses: {
      '200': {
        description: 'Pet model instance',
        content: {'application/json': {schema: getModelSchemaRef(PetFile)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pet.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetFile, {
            title: 'NewPetFileInPet',
            exclude: ['id'],
            optional: ['petId']
          }),
        },
      },
    }) petFile: Omit<PetFile, 'id'>,
  ): Promise<PetFile> {
    return this.petRepository.files(id).create(petFile);
  }

  @patch('/pets/{id}/pet-files', {
    responses: {
      '200': {
        description: 'Pet.PetFile PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetFile, {partial: true}),
        },
      },
    })
    petFile: Partial<PetFile>,
    @param.query.object('where', getWhereSchemaFor(PetFile)) where?: Where<PetFile>,
  ): Promise<Count> {
    return this.petRepository.files(id).patch(petFile, where);
  }

  @del('/pets/{id}/pet-files', {
    responses: {
      '200': {
        description: 'Pet.PetFile DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PetFile)) where?: Where<PetFile>,
  ): Promise<Count> {
    return this.petRepository.files(id).delete(where);
  }
}
