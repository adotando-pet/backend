import {DefaultCrudRepository} from '@loopback/repository';
import {LiveWell, LiveWellRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LiveWellRepository extends DefaultCrudRepository<
  LiveWell,
  typeof LiveWell.prototype.id,
  LiveWellRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(LiveWell, dataSource);
  }
}
