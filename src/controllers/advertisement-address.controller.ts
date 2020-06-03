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
  Address,
} from '../models';
import {AdvertisementRepository} from '../repositories';

export class AdvertisementAddressController {
  constructor(
    @repository(AdvertisementRepository)
    public advertisementRepository: AdvertisementRepository,
  ) { }

  @get('/advertisements/{id}/address', {
    responses: {
      '200': {
        description: 'Address belonging to Advertisement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Address)},
          },
        },
      },
    },
  })
  async getAddress(
    @param.path.string('id') id: typeof Advertisement.prototype.id,
  ): Promise<Address> {
    return this.advertisementRepository.address(id);
  }
}
