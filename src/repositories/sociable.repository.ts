import {DefaultCrudRepository} from '@loopback/repository';
import {Sociable, SociableRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SociableRepository extends DefaultCrudRepository<
  Sociable,
  typeof Sociable.prototype.id,
  SociableRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(Sociable, dataSource);
  }
}
