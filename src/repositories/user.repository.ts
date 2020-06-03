import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, BelongsToAccessor} from '@loopback/repository';
import {PgDataSource} from '../datasources';
import {Phone, User, UserRelations, Address, Pet, File, Advertisement, Interested} from '../models';
import {PhoneRepository} from './phone.repository';
import {AddressRepository} from './address.repository';
import {PetRepository} from './pet.repository';
import {FileRepository} from './file.repository';
import {AdvertisementRepository} from './advertisement.repository';
import {InterestedRepository} from './interested.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {

  public readonly phones: HasManyRepositoryFactory<Phone, typeof User.prototype.id>;

  public readonly addresses: HasManyRepositoryFactory<Address, typeof User.prototype.id>;

  public readonly pets: HasManyRepositoryFactory<Pet, typeof User.prototype.id>;

  public readonly avatar: BelongsToAccessor<File, typeof User.prototype.id>;

  public readonly advertisements: HasManyRepositoryFactory<Advertisement, typeof User.prototype.id>;

  public readonly interesteds: HasManyRepositoryFactory<Interested, typeof User.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('PhoneRepository') protected phoneRepositoryGetter: Getter<PhoneRepository>, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('PetRepository') protected petRepositoryGetter: Getter<PetRepository>, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>, @repository.getter('AdvertisementRepository') protected advertisementRepositoryGetter: Getter<AdvertisementRepository>, @repository.getter('InterestedRepository') protected interestedRepositoryGetter: Getter<InterestedRepository>,
  ) {
    super(User, dataSource);
    this.interesteds = this.createHasManyRepositoryFactoryFor('interesteds', interestedRepositoryGetter,);
    this.registerInclusionResolver('interesteds', this.interesteds.inclusionResolver);
    this.advertisements = this.createHasManyRepositoryFactoryFor('advertisements', advertisementRepositoryGetter,);
    this.registerInclusionResolver('advertisements', this.advertisements.inclusionResolver);
    this.avatar = this.createBelongsToAccessorFor('avatar', fileRepositoryGetter,);
    this.registerInclusionResolver('avatar', this.avatar.inclusionResolver);
    this.pets = this.createHasManyRepositoryFactoryFor('pets', petRepositoryGetter,);
    this.registerInclusionResolver('pets', this.pets.inclusionResolver);
    this.addresses = this.createHasManyRepositoryFactoryFor('addresses', addressRepositoryGetter,);
    this.registerInclusionResolver('addresses', this.addresses.inclusionResolver);
    this.phones = this.createHasManyRepositoryFactoryFor('phones', phoneRepositoryGetter);
    this.registerInclusionResolver('phones', this.phones.inclusionResolver);
  }
}
