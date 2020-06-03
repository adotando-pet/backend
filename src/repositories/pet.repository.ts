import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Pet, PetRelations, PetFile} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PetFileRepository} from './pet-file.repository';

export class PetRepository extends DefaultCrudRepository<
  Pet,
  typeof Pet.prototype.id,
  PetRelations
> {

  public readonly files: HasManyRepositoryFactory<PetFile, typeof Pet.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('PetFileRepository') protected petFileRepositoryGetter: Getter<PetFileRepository>,
  ) {
    super(Pet, dataSource);
    this.files = this.createHasManyRepositoryFactoryFor('files', petFileRepositoryGetter,);
    this.registerInclusionResolver('files', this.files.inclusionResolver);
  }
}
