import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSourceDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepositoryRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.MongoDBDataSource') dataSource: MongoDbDataSourceDataSource,
  ) {
    super(User, dataSource);
  }
}
