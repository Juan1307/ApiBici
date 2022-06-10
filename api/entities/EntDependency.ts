import client from './../connect/DbConnect';

import { CoordinatesType, ArrayLocationsType, ArrayDistanceLocationsType } from './../services/_Srv.types';
import { JSON_DATA } from './../services/_Srv.data';

import type { SrvEngineType } from './EntContainer';

export interface EntDependencyInterface {
  getDistanceDefault: () => Promise<ArrayDistanceLocationsType[]>,
  // getDistanceGoogle: () => string[],
}

class Stations {
  public async getStationsFromJson() {
    return JSON_DATA;
  }

  public async getStationsFromDatabase() {
    const { rows } = await client.query("SELECT * FROM tbl_stations");
    return rows as ArrayLocationsType[];
  }
}

class EntDependency extends Stations implements EntDependencyInterface {

  private instance: SrvEngineType; 
  private data: CoordinatesType;
  
  constructor(instance: SrvEngineType, data: CoordinatesType) {
    super();
    this.instance = instance; //set dinamyc class
    this.data = data;
  }
  
  // public async getDistanceGoogle(){
  //   return ['hi from google service']; 
  // }

  public async getDistanceDefault() {
    const currentSrv = new this.instance(this.data); //pass to instance
    const currentStations = await this.getStationsFromDatabase();

    return currentSrv.getDistanceEntry(currentStations);
  }
}

export default EntDependency;