import SrvDefault from './../services/SrvDefault';
import SrvLibrary from './../services/SrvLibrary';
import SrvGoogle from './../services/SrvGoogle';

import { EntDependencyInterface } from './EntDependency';
export { SrvDefault, SrvGoogle, SrvLibrary }; //re-export class for type

export type SrvEngineType = typeof SrvDefault | typeof SrvLibrary | typeof SrvGoogle; 

interface ContainerType {
  [key: string]: [ SrvEngineType, keyof EntDependencyInterface ]
}

export const EntContainer: ContainerType = {
  default: [ SrvDefault, 'getDistanceDefault'],
  library: [ SrvLibrary, 'getDistanceLibrary'],
  google: [ SrvGoogle, 'getDistanceGoogle']
}
