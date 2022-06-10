// import SrvLibrary from './../services/SrvLibrary.ts';
// import SrvGoogle from './../services/SrvGoogle.ts';
import SrvDefault from './../services/SrvDefault';

import { EntDependencyInterface } from './EntDependency';

export type SrvEngineType = typeof SrvDefault;  // |

interface ContainerType {
  [key: string]: [ SrvEngineType, keyof EntDependencyInterface ],
}

export const EntContainer: ContainerType = {
  // library: () => [ SrvLibrary, 'getDistanceLibrary'],
  // google: () => [ SrvGoogle, 'getDistanceGoogle'],
  default: [ SrvDefault, 'getDistanceDefault']
}
