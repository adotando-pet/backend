import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PetFile, PetFileRelations, File} from '../models';
import {PgDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {FileRepository} from './file.repository';

export class PetFileRepository extends DefaultCrudRepository<
  PetFile,
  typeof PetFile.prototype.id,
  PetFileRelations
> {

  public readonly file: BelongsToAccessor<File, typeof PetFile.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('FileRepository') protected fileRepositoryGetter: Getter<FileRepository>,
  ) {
    super(PetFile, dataSource);
    this.file = this.createBelongsToAccessorFor('file', fileRepositoryGetter,);
    this.registerInclusionResolver('file', this.file.inclusionResolver);
  }
}
