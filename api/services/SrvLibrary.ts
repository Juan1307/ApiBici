import haversine from 'haversine-distance';

import { CoordinatesType, ArrayLocationsType, ArrayDistanceLocationsType } from './_Srv.types';
import { checkIfTheSameCoordinates, checkIfTheExactDistance } from './SrvUtils';

class SrvLibrary {
 
  private pointerOne:{ lat: number, lng: number };
  private distance: number;

  constructor({ n_latitude, n_longitude, n_distance }: CoordinatesType) {
    this.pointerOne = { lat: n_latitude, lng: n_longitude };
    this.distance = n_distance;
  }

  public getDistanceEntry(data: ArrayLocationsType[]): ArrayDistanceLocationsType[] {

    const { lat, lng } = this.pointerOne;
    const arrayDistancies = [];

    for(let i = 0; data.length > i; i++) {
      const variableData = data[i];
      const { latitude, longitude } = variableData;

      if(checkIfTheSameCoordinates(variableData, lat, lng)) continue;

      const currentDistance = haversine(this.pointerOne, { lat: latitude, lon: longitude });

      if(checkIfTheExactDistance(currentDistance, this.distance)){
        arrayDistancies.push({ ...variableData, distance: currentDistance });
      }
    }

    return arrayDistancies; 
  }
}

export default SrvLibrary