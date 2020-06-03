import {DefaultCrudRepository} from '@loopback/repository';
import {Interested, InterestedRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InterestedRepository extends DefaultCrudRepository<
  Interested,
  typeof Interested.prototype.id,
  InterestedRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(Interested, dataSource);
  }
}
