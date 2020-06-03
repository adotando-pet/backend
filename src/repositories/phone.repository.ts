import {DefaultCrudRepository} from '@loopback/repository';
import {Phone, PhoneRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PhoneRepository extends DefaultCrudRepository<
  Phone,
  typeof Phone.prototype.id,
  PhoneRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(Phone, dataSource);
  }
}
