import { CoordinatesType, ArrayLocationsType, ArrayDistanceLocationsType } from './_Srv.types';
import { checkIfTheSameCoordinates, checkIfTheExactDistance } from './SrvUtils';

class SrvDefault {
  public exact = false;

  private lat: number;
  private lng: number;
  private distance: number;

  //set data to properties
  constructor({ n_latitude, n_longitude, n_distance }: CoordinatesType) {
    this.lat = n_latitude;
    this.lng = n_longitude;
    this.distance = n_distance;
  }

  public checkRadiansByLatitude(lat: number) {
    const getRadians = (num: number, { PI } = Math) => (PI * num) / 180;
    return getRadians(lat);
  }

  public calculateDistanceByRadios(radio1: number, radio2: number, radioTheta: number) {
    const { sin, cos } = Math;
    const first = sin(radio1) * sin(radio2);
    const second = cos(radio1) * cos(radio2) * cos(radioTheta);
    
    return first + second;
  }

  public calculateDistance(distance: number) {
    const { PI, acos, round } = Math;

    let radioDistance = acos(distance);
        radioDistance = (radioDistance * 180) / PI;
        radioDistance =  radioDistance * 60 * 1.1515; //miles
        radioDistance =  radioDistance * 1.609344; //km
        radioDistance =  radioDistance * 1000; //m
            
    return this.exact ? radioDistance : round(radioDistance) ; //pass exact or round value
  }

  public getDistanceEntry(data: ArrayLocationsType[]): ArrayDistanceLocationsType[] {

    const staticRadio = this.checkRadiansByLatitude(this.lat); //ref to current this
    const arrayDistancies = [];

    for(let i = 0; data.length > i; i++) {
      const variableData = data[i];
      const { latitude, longitude, status } = variableData;
      if(checkIfTheSameCoordinates(variableData, this.lat, this.lng)) continue; // if same coordinates

      // ordenate coordenates
      const currentTheta = this.lng - longitude;
      const currentRadio = this.checkRadiansByLatitude(latitude);
      const currentRadioTheta = this.checkRadiansByLatitude(currentTheta);

      const currentRadioDistance = this.calculateDistanceByRadios(staticRadio, currentRadio, currentRadioTheta);
      const currentDistance = this.calculateDistance(currentRadioDistance);

      if(checkIfTheExactDistance(currentDistance, this.distance, status)){
        arrayDistancies.push({ ...variableData, distance: currentDistance });
      }
    }

    return arrayDistancies;
  }

}

export default SrvDefault