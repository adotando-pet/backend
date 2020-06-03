import {DefaultCrudRepository} from '@loopback/repository';
import {Adoption, AdoptionRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AdoptionRepository extends DefaultCrudRepository<
  Adoption,
  typeof Adoption.prototype.id,
  AdoptionRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(Adoption, dataSource);
  }
}
