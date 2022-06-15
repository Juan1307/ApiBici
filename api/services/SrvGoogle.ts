import { SphericalUtil } from 'node-geometry-library'; //library with google geometry library

import { CoordinatesType, CoordinateType, ArrayLocationsType, ArrayDistanceLocationsType } from './_Srv.types';
import { checkIfTheSameCoordinates, checkIfTheExactDistance } from './SrvUtils';

class SrvGoogle {
  private pointerOne: CoordinateType; //infered
  private distance: number;  

  constructor({ n_latitude, n_longitude, n_distance }: CoordinatesType) {
    this.pointerOne = { lat: n_latitude, lng: n_longitude };
    this.distance = n_distance;
  }

  public getDistanceEntry(data: ArrayLocationsType[]): ArrayDistanceLocationsType[] {
    const { lat, lng } = this.pointerOne ;
    const arrayDistancies = [];

    for(let i = 0; data.length > i; i++) {
      const variableData = data[i];
      const { latitude, longitude, status } = variableData;

      if(checkIfTheSameCoordinates(variableData, lat, lng)) continue;
      const currentDistance = SphericalUtil.computeDistanceBetween(this.pointerOne, { lat: latitude, lng: longitude }); 

      if(checkIfTheExactDistance(currentDistance, this.distance, status)){
        arrayDistancies.push({ ...variableData, distance: currentDistance });
      }
    }

    return arrayDistancies; 
  }
}

export default SrvGoogle