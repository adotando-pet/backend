import {DefaultCrudRepository} from '@loopback/repository';
import {Temperament, TemperamentRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TemperamentRepository extends DefaultCrudRepository<
  Temperament,
  typeof Temperament.prototype.id,
  TemperamentRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(Temperament, dataSource);
  }
}
