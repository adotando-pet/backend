import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Advertisement, AdvertisementRelations, Pet, Address, Interested} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PetRepository} from './pet.repository';
import {AddressRepository} from './address.repository';
import {InterestedRepository} from './interested.repository';

export class AdvertisementRepository extends DefaultCrudRepository<
  Advertisement,
  typeof Advertisement.prototype.id,
  AdvertisementRelations
> {

  public readonly pet: BelongsToAccessor<Pet, typeof Advertisement.prototype.id>;

  public readonly address: BelongsToAccessor<Address, typeof Advertisement.prototype.id>;

  public readonly interesteds: HasManyRepositoryFactory<Interested, typeof Advertisement.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('PetRepository') protected petRepositoryGetter: Getter<PetRepository>, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('InterestedRepository') protected interestedRepositoryGetter: Getter<InterestedRepository>,
  ) {
    super(Advertisement, dataSource);
    this.interesteds = this.createHasManyRepositoryFactoryFor('interesteds', interestedRepositoryGetter,);
    this.registerInclusionResolver('interesteds', this.interesteds.inclusionResolver);
    this.address = this.createBelongsToAccessorFor('address', addressRepositoryGetter,);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
    this.pet = this.createBelongsToAccessorFor('pet', petRepositoryGetter,);
    this.registerInclusionResolver('pet', this.pet.inclusionResolver);
  }
}
