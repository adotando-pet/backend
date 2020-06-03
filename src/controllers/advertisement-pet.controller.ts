import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Advertisement,
  Pet,
} from '../models';
import {AdvertisementRepository} from '../repositories';

export class AdvertisementPetController {
  constructor(
    @repository(AdvertisementRepository)
    public advertisementRepository: AdvertisementRepository,
  ) { }

  @get('/advertisements/{id}/pet', {
    responses: {
      '200': {
        description: 'Pet belonging to Advertisement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pet)},
          },
        },
      },
    },
  })
  async getPet(
    @param.path.string('id') id: typeof Advertisement.prototype.id,
  ): Promise<Pet> {
    return this.advertisementRepository.pet(id);
  }
}
