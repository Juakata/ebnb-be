import { Query, Resolver } from '@nestjs/graphql';
import { FeatureType } from './feature.type';

@Resolver((of) => FeatureType)
export class FeatureResolver {
  @Query((returns) => FeatureType)
  feature() {
    return {
      id: 'asd213as',
      name: 'Aire Acondicionado',
    };
  }
}
