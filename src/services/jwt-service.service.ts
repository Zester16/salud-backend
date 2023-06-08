import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { post } from '@loopback/rest';

@injectable({ scope: BindingScope.TRANSIENT })
export class JwtServiceService {
  constructor() { }



}
